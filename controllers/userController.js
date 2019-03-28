const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lucky-backend',
  password: 'minacleo',
  port: 5432,
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const createUser = (request, response) => {
    const { name, email, birthday } = request.body
  
    pool.query('INSERT INTO users (name, email, birthday) VALUES ($1, $2, $3) returning user_id', [name, email, birthday], (error, results) => {
      if (error) {
        throw error;
      }
      let rows = results.rows[0];
      console.log(rows['user_id']);
      response.status(201).send(rows['user_id']);
    })
  }

module.exports = {
    getUsers,
    createUser
  }