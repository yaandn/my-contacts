const db = require('../../database/index');

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY name ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1
    `, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`SELECT * FROM contacts WHERE email = $1`, [email]);
    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(
      `INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [name, email, phone, category_id],
    );

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOP = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOP;
  }
}

module.exports = new ContactsRepository();

/*
    Nossos repositórios é onde ficarão localizados as lógicas do nosso código que vão
    ser utilizadas pelos controllers

    Semelhante aos controllers, cada repositório é uma classe que será exportade e importada nos
    controllers

    o Repositorie vai bater no banco de dados e buscar informações para mandar para o
    controller e esse retorno vai ser uma promisse para que lá no nosso controller a funcção seja
    assíncrona
*/
