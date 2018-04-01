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
  create: async (camp) => {
    const {
      title, subTitles, description, published, features
    } = camp;

    const query = `
      INSERT INTO camps(title, sub_titles, description, published)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `;
    const newCamp = await db.query(query, [title, subTitles, description, published]);
    const newCampId = newCamp.rows[0].id;

    const location = await CampLocation.create(features[0], newCampId);

    return {
      ...newCamp.rows[0],
      locations: [
        {
          id: location.id,
          geometry: location.geom,
          description: location.description,
          typeId: location.type_id,
          activityId: location.activity_id,
          regionId: location.region_id,
          statistics: null
        }
      ]
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
        'locations', (
          SELECT json_agg(json_build_object(
            'id', id,
            'geometry', geom,
            'description', description,
            'typeId', type_id,
            'activityId', activity_id,
            'regionId', region_id,
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
    return result.rows[0].json_agg;
  },

  update: async (camp, campId) => {
    const {
      title, subTitles, description, published
    } = camp;
    const query = `
      UPDATE camps
      SET title=$1, sub_titles=$2, description=$3, published=$4
      WHERE id = $5
      RETURNING id, title, sub_titles AS "subTitles", description, published;
    `;
    const result = await db.query(query, [title, subTitles, description, published, campId]);
    return result.rows[0];
  },

  delete: async (id) => {
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
