const pool = require('../utils/pool');

module.exports = class Dog {
  id;
  name;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
  }

  static async insert({ name, color }) {
    const { rows } = await pool.query(
      `INSERT INTO
        flowers (name, color)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [name, color]
    );
    return new Dog(rows[0]);
  }
};
