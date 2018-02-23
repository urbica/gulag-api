exports.up = db =>
  db.createTable('periods', {
    id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    year: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    title: {
      type: 'string',
      notNull: true
    },
    description: {
      type: 'string',
      notNull: true
    }
  });

exports.down = db => db.dropTable('periods');
