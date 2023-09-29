const tokenService = require('../services/tokenService');
const { RefreshToken } = require('../models');
const TokenError = require('../errors/TokenError');

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization }
    } = req;

    if (!authorization) {
      return next(new TokenError('Access token required'));
    }

    const [tokenType, accessToken] = authorization.split(' ');


    if (!accessToken) {
      return next(new TokenError('Access token required'));
    }

    req.tokenData = await tokenService.verifyAccessToken(accessToken);

    next();

  } catch (error) {
    next(error)
  }
}

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const { body: { refreshToken } } = req;

    await tokenService.verifyRefreshToken(refreshToken);

    const refreshTokenInstance = await RefreshToken.findOne({
      where: {
        token: refreshToken
      }
    });

    if (!refreshTokenInstance) {
      return next(new TokenError('Invalid refresh token'));
    }

    req.refreshTokenInstance = refreshTokenInstance;

    next();
  } catch (error) {
    next(error);
  }
}
