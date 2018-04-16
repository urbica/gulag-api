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
    const { description, path, campId } = photo;

    const query = `
      INSERT INTO photos(description, file_path, camp_id)
      VALUES($1, $2, $3)
      RETURNING id, description, file_path AS path, camp_id AS "campId";
    `;

    const newPhoto = await db.query(query, [description, path, campId]);
    const result = newPhoto.rows[0];

    return result;
  },

  updateAll: async (photos) => {
    const query = `
      UPDATE photos p
      SET
        description = upd.j->'description'
      FROM (SELECT json_array_elements ($1::JSON) j) upd
      WHERE
        p.id = (upd.j->>'id')::INTEGER
      RETURNING id, description;
    `;
    const result = await db.query(query, [JSON.stringify(photos)]);

    return result.rows;
  },

  delete: async (id) => {
    const query = `
      DELETE FROM photos
      WHERE photos.id = $1
      RETURNING file_path;
    `;

    try {
      const result = await db.query(query, [id]);

      return result.rows[0].file_path;
    } catch (error) {
      throw error;
    }
  }
};
