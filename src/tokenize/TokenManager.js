const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/invariantError');

const TokenManager = {
  generateAccessToken(payload) {
    return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
  },

  generateRefreshToken(payload) {
    return Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY);
  },

  verifyRefreshToken(refreshToken) {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);

      return artifacts.decoded.payload;
    } catch {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
