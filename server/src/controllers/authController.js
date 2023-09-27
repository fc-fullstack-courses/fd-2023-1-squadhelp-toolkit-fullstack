const authService = require('../services/authService');
const { User } = require('../models');
const NotFoundError = require('../errors/UserNotFoundError');

module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    const userWithTokens = await authService.createSession(user);

    res.status(201).send(userWithTokens);
  } catch (error) {
    next(error);
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(NotFoundError('user with this data didn`t exist'));
    }

    await user.comparePassword(password);

    const userWithTokens = await authService.createSession(user);

    res.send(userWithTokens);
  } catch (error) {
    next(error);
  }
}

module.exports.refresh = async (req, res, next) => {
  try {
    const { refreshTokenInstance } = req;

    const userWithTokens = await authService.refreshSession(refreshTokenInstance);

    res.send(userWithTokens);
  } catch (error) {
    next(error);
  }
}