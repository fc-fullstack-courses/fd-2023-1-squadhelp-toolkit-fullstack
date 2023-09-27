const authRouter = require('express').Router();
const validators = require('../middlewares/validators');
const authController = require('../controllers/authController');
const { checkRefreshToken } = require('../middlewares/tokenMiddlewares');

authRouter.post(
  '/registration',
  validators.validateRegistrationData,
  authController.registration
);

authRouter.post('/login', validators.validateLogin, authController.login);

authRouter.post('/refresh', checkRefreshToken, authController.refresh);

module.exports = authRouter;
