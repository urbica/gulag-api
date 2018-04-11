const db = require('../db');

// create table photos (
//     id serial primary key,
//     title jsonb NOT NULL,
//     description jsonb NOT NULL,
//     file_path text NOT NULL,
//     camp_id integer NOT NULL
// );

module.exports = {
  create: async (photo) => {
    const {
      title, description, path, campId
    } = photo;

    const query = `
      INSERT INTO photos(
        title, description, file_path, camp_id
      )
      VALUES($1, $2, $3, $4)
      RETURNING id, title, description, file_path AS path, camp_id AS "campId";
    `;

    const newPhoto = await db.query(query, [title, description, path, campId]);
    const result = newPhoto.rows[0];

    return result;
  }

  // update: async (camp, campId) => {
  //   const {
  //     title, subTitles, description, published, typeId, activityId, regionId
  //   } = camp;
  //   const query = `
  //     UPDATE camps
  //     SET
  //       title=$1,
  //       sub_titles=$2,
  //       description=$3,
  //       published=$4,
  //       type_id=$5,
  //       activity_id=$6,
  //       region_id=$7
  //     WHERE id = $8
  //     RETURNING id, title, sub_titles AS "subTitles", description, published, type_id AS "typeId", activity_id AS "activityId", region_id AS "regionId";
  //   `;
  //   const result = await db.query(query, [
  //     title,
  //     subTitles,
  //     description,
  //     published,
  //     typeId,
  //     activityId,
  //     regionId,
  //     campId
  //   ]);
  //   return result.rows[0];
  // },
  //
  // delete: async (id) => {
  //   // TODO: delete locations & statistics
  //   const query = `
  //     DELETE FROM camps
  //     WHERE camps.id = $1;
  //   `;
  //   try {
  //     await db.query(query, [id]);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
};
