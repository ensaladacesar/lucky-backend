var db =  require('../database/db.js');

const getProducts = (request, response) => {
    db.pool.query('SELECT *, products.name as product_name, brands.name as brand_name, categories.name as categorie_name FROM products inner join brands on products.brand_id = brands.brand_id inner join categories on products.category_id = categories.category_id', (error, results) => {
      if (error) {
        response.status(400).send(error);
      }
      else{
        response.status(200).json(results.rows);
      }
    });
}

const getFeatured = (request, response) => {
    db.pool.query('select *, products.name as product_name, brands.name as brand_name, categories.name as category_name from featured inner join products on featured.product_id = products.product_id inner join brands on products.brand_id = brands.brand_id inner join categories on products.category_id = categories.category_id', (error, results) => {
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
  
  db.pool.query(`SELECT *, products.name as product_name, brands.name as brand_name, categories.name as category_name FROM products INNER JOIN brands ON products.brand_id = brands.brand_id INNER JOIN categories ON products.category_id = categories.category_id WHERE lower(products.name) like lower('%${keyword}%')`,  (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    else{
      response.status(200).json(results.rows);
    }
    
  });
}

const getProduct = (request, response) => {
  const { product_id } = request.body

  db.pool.query('SELECT *, products.name as product_name, brands.name as brand_name, categories.name as category_name FROM products INNER JOIN brands ON products.brand_id = brands.brand_id INNER JOIN categories ON products.category_id = categories.category_id WHERE product_id = $1', [ product_id ], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    else{
      console.log(results.rows)
      response.status(200).json(results.rows);
    }
    
  });
}

const addProduct = (request, response) => {
  const { name, description, price, category_id, brand_id } = request.body;
  let ticket_price = 0;
  let available_tickets = 0;

  if(price < 2500){
    ticket_price = 7.5;
  }

  if(price > 2500 && price < 5500){
    ticket_price = 15;
  }

  if(price > 5500 && price < 9500){
    ticket_price = 30;
  }

  if(price > 9500 && price < 17500){
    ticket_price = 60;
  }

  if(price > 17500){
    ticket_price = 120;
  }

  available_tickets = Math.round(price/ticket_price);


  db.pool.query('INSERT INTO products (name, description, price, category_id, brand_id, available_tickets, ticket_price) VALUES ($1, $2, $3, $4, $5, $6, $7) returning product_id', [ name, description, price, category_id, brand_id, available_tickets, ticket_price ], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    else{
      let rows = results.rows[0];
      console.log(rows);
      response.status(200).json(rows);
    }
    
  });
}
module.exports = {
  getProducts,
  getFeatured,
  addFeatured,
  getByBrand,
  searchProduct,
  getProduct,
  addProduct
}