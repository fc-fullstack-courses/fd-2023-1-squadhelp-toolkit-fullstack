const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME
} = require('../constants');

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: ACCESS_TOKEN_SECRET,
    expiresIn: ACCESS_TOKEN_TIME
  },
  refresh: {
    secret: REFRESH_TOKEN_SECRET,
    expiresIn: REFRESH_TOKEN_TIME
  },
}

const createToken = (payload, { secret, expiresIn }) => signJWT(payload, secret, { expiresIn });
const verifyToken = (token, { secret }) => verifyJWT(token, secret);

module.exports.generateTokenPair = async (payload) => ({
  accessToken: await createToken(payload, tokenConfig.access),
  refreshToken: await createToken(payload, tokenConfig.refresh),
});

module.exports.verifyAccessToken = async (token) => verifyToken(token, tokenConfig.access);
module.exports.verifyRefreshToken = async (token) => verifyToken(token, tokenConfig.refresh);