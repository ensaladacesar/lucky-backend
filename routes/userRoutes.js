module.exports = function(app) {
    var userController = require('../controllers/userController');
  
    app.route('/getUsers')
      .get(userController.getUsers);

      app.route('/createUser')
      .post(userController.createUser);
};