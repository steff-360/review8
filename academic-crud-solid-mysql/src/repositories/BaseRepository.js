export class BaseRepository {
  constructor(db, entity) {
    this.db = db;
    this.entity = entity;
  }

  async findAll() {
    const sql = `SELECT * FROM ${this.entity.table}`;
    const [rows] = await this.db.execute(sql);
    return rows;
  }

  async findById(id) {
    const sql = `
      SELECT *
      FROM ${this.entity.table}
      WHERE ${this.entity.idField} = ?
    `;

    const [rows] = await this.db.execute(sql, [id]);
    return rows[0] ?? null;
  }

  async create(data) {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const columns = fields.join(', ');
    const placeholders = fields.map(() => '?').join(', ');

    const sql = `
      INSERT INTO ${this.entity.table} (${columns})
      VALUES (${placeholders})
    `;

    const [result] = await this.db.execute(sql, values);
    return this.findById(result.insertId);
  }

  async update(id, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    const assignments = fields
      .map((field) => `${field} = ?`)
      .join(', ');

    const sql = `
      UPDATE ${this.entity.table}
      SET ${assignments}
      WHERE ${this.entity.idField} = ?
    `;

    const [result] = await this.db.execute(sql, [...values, id]);

    if (result.affectedRows === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id) {
    const sql = `
      DELETE FROM ${this.entity.table}
      WHERE ${this.entity.idField} = ?
    `;

    const [result] = await this.db.execute(sql, [id]);
    return result.affectedRows > 0;
  }
}
