const db = require('../db');
const CampStatistics = require('../camp-statistics/camp-statistics.model');

// create table camp_locations (
//   id serial primary key,
//   geom jsonb,
//   description jsonb,
//   order_index integer,
//   camp_id integer
// );

module.exports = {
  create: async (location, campId) => {
    const { geometry, description, orderIndex } = location;
    const query = `
      INSERT INTO camp_locations(geom, description, order_index, camp_id)
      VALUES($1, $2, $3, $4)
      RETURNING id, geom AS geometry, description, order_index AS "orderIndex";
    `;
    const result = await db.query(query, [geometry, description, orderIndex, campId]);
    const newLocation = result.rows[0];

    const statistics = location.statistics || [];

    const newStatistics = await Promise.all(statistics.map(async (stat) => {
      const newStat = await CampStatistics.create(stat, newLocation.id);
      return newStat;
    }));

    return {
      ...newLocation,
      statistics: newStatistics
    };
  },

  update: async (location) => {
    const { id, geometry, description } = location;
    const query = `
      UPDATE camp_locations
      SET
        geom=$1,
        description=$2
      WHERE id=$3
      RETURNING id, geom AS geometry, description;
    `;
    const result = await db.query(query, [geometry, description, id]);
    const updatedLocation = result.rows[0];

    const updatedStatistics = await Promise.all(location.statistics.map(async (stat) => {
      if (stat.id === undefined) {
        const createdStat = await CampStatistics.create(stat, id);
        return createdStat;
      }
      const updatedStat = await CampStatistics.update(stat);
      return updatedStat;
    }));

    return {
      ...updatedLocation,
      statistics: updatedStatistics
    };
  },

  delete: async (id) => {
    const query = `
        DELETE FROM camp_locations
        WHERE camp_locations.id = $1
        RETURNING camp_id AS "campId", id AS "locationId";
      `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
};
