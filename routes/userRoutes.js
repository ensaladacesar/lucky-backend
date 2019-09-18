module.exports = function(app) {
    var userController = require('../controllers/userController');
  
    app.route('/api/getUsers')
      .get(userController.getUsers);

    app.route('/api/createUser')
      .post(userController.createUser);

    app.route('/api/createUserPoints')
      .post(userController.createUserPoints);

    app.route('/api/createUserCredit')
      .post(userController.createUserCredit);

    app.route('/api/userExist')
      .post(userController.userExist);

    app.route('/api/getUserCredit')
      .post(userController.getUserCredit);
};