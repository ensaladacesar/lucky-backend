var db =  require('../database/db.js');

const getBrands = (request, response) => {
  db.pool.query('SELECT * FROM brands', (error, results) => {
    if (results.rowCount == 0) {
      response.status(201).send(false);
    }
    else{
      response.status(200).json(results.rows);
    }
  });
}

const brandExist = (request, response) => {
  const { name } = request.body

  db.pool.query('SELECT * FROM brands WHERE name = $1', [name], (error, results) => {
    if (results.rowCount == 0) {
      response.status(201).send(false);
    }
    else{
      response.status(201).send(true);
    }
    
  })
}


const createBrand = (request, response) => {
  const { name } = request.body

  db.pool.query('INSERT INTO brands (name) VALUES ($1) returning brand_id', [name], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    else{
      let rows = results.rows[0];
      console.log(rows['brand_id']);
      response.status(200).json(rows['brand_id']);
    }
    
  })
}

module.exports = {
  getBrands,
  brandExist,
  createBrand
}