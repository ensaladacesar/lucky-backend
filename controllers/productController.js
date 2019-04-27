var db =  require('../database/db.js');

const getProducts = (request, response) => {
    db.pool.query('SELECT * FROM products', (error, results) => {
      if (error) {
        response.status(400).send(error);
      }
      else{
        response.status(200).json(results.rows);
      }
    });
}

const getFeatured = (request, response) => {
    db.pool.query('select *, products.name as product_name, brands.name as brand_name, categories.name as categorie_name from featured inner join products on featured.product_id = products.product_id inner join brands on products.brand_id = brands.brand_id inner join categories on products.category_id = categories.category_id', (error, results) => {
      if (error) {
        response.status(400).send(error);
      }
      else{
        response.status(200).json(results.rows);
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

const getByBrand = (request, response) => {
  const { brand_id } = request.body

  db.pool.query('SELECT * FROM products WHERE brand_id = $1', [ brand_id ], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    else{
      response.status(200).json(results.rows);
    }
    
  });
}

const searchProduct = (request, response) => {
  const { keyword } = request.body;

  console.log(keyword);
  
  db.pool.query(`select * from products where lower(name) like lower('%${keyword}%')`,  (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    else{
      response.status(200).json(results.rows);
    }
    
  });
}

module.exports = {
    getProducts,
    getFeatured,
    addFeatured,
    getByBrand,
    searchProduct
  }