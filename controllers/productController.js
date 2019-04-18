var db =  require('../database/db.js');

const getProducts = (request, response) => {
    db.pool.query('SELECT * FROM products', (error, results) => {
      if (error) {
        response.status(400).send(error);
      }
      else{
        response.status(200).json(results.rows)
      }
    });
}

const getFeatured = (request, response) => {
    db.pool.query('select * from featured inner join products on featured.product_id = products.product_id', (error, results) => {
      if (error) {
        response.status(400).send(error);
      }
      else{
        response.status(200).json(results.rows)
      }
    });
}


const addFeatured = (request, response) => {
  const { product_id } = request.body

  db.pool.query('INSERT INTO featured (product_id) VALUES ($1) returning product_id', [ product_id ], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    else{
      let rows = results.rows[0];
      console.log(rows['product_id']);
      response.status(200).json(rows['product_id']);
    }
    
  });
}

module.exports = {
    getProducts,
    getFeatured,
    addFeatured
  }