const tokenService = require('./tokenService');
const { RefreshToken } = require('../models');

module.exports.createSession = async (user) => {

  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role
  }

  const tokenPair = await tokenService.generateTokenPair(tokenPayload);

  await RefreshToken.create({
    token: tokenPair.refreshToken,
    userId: user.id
  });

  return { user, tokenPair }
}

module.exports.refreshSession = async (refreshTokenInstance) => {

  const user = await refreshTokenInstance.getUser();

  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role
  }

  const tokenPair = await tokenService.generateTokenPair(tokenPayload);

  await refreshTokenInstance.update({ token: tokenPair.refreshToken });

  return { user, tokenPair }
}
