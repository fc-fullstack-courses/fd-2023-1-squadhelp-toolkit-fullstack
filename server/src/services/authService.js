const tokenService = require('./tokenService');
const { RefreshToken } = require('../models');

module.exports.createSession = async (user) => {

  const tokenPayload = {
    firstName: user.firstName,
    userId: user.id,
    role: user.role,
    lastName: user.lastName,
    avatar: user.avatar,
    displayName: user.displayName,
    balance: user.balance,
    email: user.email,
    rating: user.rating,
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
    firstName: user.firstName,
    userId: user.id,
    role: user.role,
    lastName: user.lastName,
    avatar: user.avatar,
    displayName: user.displayName,
    balance: user.balance,
    email: user.email,
    rating: user.rating,
  }

  const tokenPair = await tokenService.generateTokenPair(tokenPayload);

  await refreshTokenInstance.update({ token: tokenPair.refreshToken });

  return { user, tokenPair }
}
