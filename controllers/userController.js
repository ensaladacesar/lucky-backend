var db =  require('../database/db.js');

const getUsers = (request, response) => {
    db.pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        response.status(400).send(error);
      }
      else{
        response.status(200).json(results.rows)
      }
    });
}

const userExist = (request, response) => {
  const { email } = request.body

  db.pool.query('SELECT email FROM USERS WHERE email = $1', [email], (error, results) => {
    if (results.rowCount == 0) {
      response.status(201).send(false);
    }
    else{
      response.status(201).send(true);
    }
    
  })
}


const createUser = (request, response) => {
  const { name, email, birthday } = request.body

  db.pool.query('INSERT INTO users (name, email, birthday) VALUES ($1, $2, $3) returning user_id', [name, email, birthday], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    else{
      let rows = results.rows[0];
      console.log(rows['user_id']);
      response.status(200).json(rows['user_id']);
    }
    
  })
}

const createUserPoints = (request, response) => {
  const { user_id } = request.body

  db.pool.query('INSERT INTO points (quantity, user_id) VALUES (20, $1)', [user_id], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    else{
      response.status(201).send(true);
    }
    
  })
}

const createUserCredit = (request, response) => {
  const { user_id } = request.body

  db.pool.query('INSERT INTO credit (quantity, user_id) VALUES (20, $1)', [user_id], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    else{
      response.status(201).send(true);
    }
    
  })
}

module.exports = {
    getUsers,
    createUser,
    createUserPoints,
    createUserCredit,
    userExist
  }