const createRandomUser = require("../../utils/createRandomUser");

class PeopleRepository {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * from pessoas;`, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  async insertRandomUser() {
    return new Promise(async (resolve, reject) => {
      const randomName = await createRandomUser();
      this.db.query(
        `INSERT INTO pessoas(nome) VALUES('${randomName}');`,
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  }
}

module.exports = PeopleRepository;
