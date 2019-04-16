module.exports = function(app) {
    var brandController = require('../controllers/brandController');
  
    app.route('/api/getBrands')
      .get(brandController.getBrands);

    app.route('/api/brandExist')
      .post(brandController.brandExist);

    app.route('/api/createBrand')
      .post(brandController.createBrand);

};