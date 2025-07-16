const refreshTokens = [];

const refreshTokenModel = {
  async add(token) {
    refreshTokens.push(token);
  },
  async exists(token) {
    return refreshTokens.includes(token);
  },
  async delete(token) {
    const idx = refreshTokens.indexOf(token);
    if (idx !== -1) {
      refreshTokens.splice(idx, 1);
      return true;
    }
    return false;
  },
};

module.exports = refreshTokenModel;
