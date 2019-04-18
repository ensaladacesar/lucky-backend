module.exports = function(app) {
    var productController = require('../controllers/productController');
  
    app.route('/api/getProducts')
      .get(productController.getProducts);

    app.route('/api/getFeatured')
      .get(productController.getFeatured);

    app.route('/api/addFeatured')
      .post(productController.addFeatured);

};