const db = require('../db');
const CampLocation = require('../camp-location/camp-location.model');

// create table camps (
//     id serial primary key,
//     title jsonb NOT NULL,
//     sub_titles jsonb NOT NULL,
//     description jsonb NOT NULL,
//     notes text
// );

module.exports = {
  create: async camp => {
    const {
      title,
      subTitles,
      description,
      published,
      typeId,
      activityId,
      regionId
    } = camp;

    const query = `
      INSERT INTO camps(
        title, sub_titles, description, published, type_id, activity_id,
        region_id
      )
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, title, sub_titles AS "subTitles", description, published,
      type_id AS "typeId", activity_id AS "activityId", region_id AS "regionId";
    `;
    const newCamp = await db.query(query, [
      title,
      subTitles,
      description,
      published,
      typeId,
      activityId,
      regionId
    ]);
    const newCampId = newCamp.rows[0].id;

    const newLocation = await CampLocation.create(camp.locations[0], newCampId);

    return {
      ...newCamp.rows[0],
      locations: [{ ...newLocation }]
    };
  },

  getAll: async () => {
    const query = `
      SELECT json_agg(json_build_object (
        'id', id,
        'title', title,
        'subTitles', sub_titles,
        'description', description,
        'published', published,
        'typeId', type_id,
        'activityId', activity_id,
        'regionId', region_id,
        'photos', coalesce((
          SELECT json_agg(json_build_object(
            'id', id,
            'title', title,
            'description', description,
            'path', file_path
          ))
          FROM photos p
          WHERE p.camp_id = c.id
        ), '[]'::json),
        'locations', (
          SELECT json_agg(json_build_object(
            'id', id,
            'geometry', geom,
            'description', description,
            'orderIndex', order_index,
            'statistics', coalesce((
              SELECT json_agg(json_build_object(
                'id', id,
                'year', year,
                'prisonersCount', prisoners_count
              ))
              FROM camp_statistics cs
              WHERE cs.location_id = cl.id
            ), '[]'::json)
          ))
          FROM camp_locations cl
          WHERE cl.camp_id = c.id
        )
      ))
      FROM camps c;
    `;
    const result = await db.query(query);

    if (!result.rows[0].json_agg) {
      return [];
    }

    return result.rows[0].json_agg;
  },

  update: async (camp, campId) => {
    const {
      title,
      subTitles,
      description,
      published,
      typeId,
      activityId,
      regionId
    } = camp;
    const query = `
      UPDATE camps
      SET
        title=$1,
        sub_titles=$2,
        description=$3,
        published=$4,
        type_id=$5,
        activity_id=$6,
        region_id=$7
      WHERE id = $8
      RETURNING id, title, sub_titles AS "subTitles", description, published,
      type_id AS "typeId", activity_id AS "activityId", region_id AS "regionId";
    `;
    const result = await db.query(query, [
      title,
      subTitles,
      description,
      published,
      typeId,
      activityId,
      regionId,
      campId
    ]);
    return result.rows[0];
  },

  delete: async id => {
    // TODO: delete locations & statistics
    const query = `
      DELETE FROM camps
      WHERE camps.id = $1;
    `;
    try {
      await db.query(query, [id]);
    } catch (error) {
      throw error;
    }
  }
};
