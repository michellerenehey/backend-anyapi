const flowers = require('../controllers/flowers');
const pool = require('../utils/pool');

module.exports = class Flower {
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
    return new Flower(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      flowers
      `
    );
    return rows.map((row) => new Flower(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT 
      * 
      FROM 
      flowers 
      WHERE 
      id=$1
      `,
      [id]
    );
    return new Flower(rows[0]);
  }
};
