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
      features: [
        {
          geometry: location.geom,
          properties: {
            description: location.description,
            type_id: location.type_id,
            activity_id: location.activity_id,
            region_id: location.region_id
          }
        }
      ]
    };
  },

  getAll: async () => {
    const query = `
      SELECT *
      FROM camps;
    `;
    const result = await db.query(query);
    return result.rows;
  }
};
