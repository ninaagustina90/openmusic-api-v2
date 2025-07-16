const users = [];

const userModel = {
  async findByUsername(username) {
    return users.find((u) => u.username === username);
  },
  async create({ id, username, password, fullname }) {
    users.push({ id, username, password, fullname });
    return id;
  },
};

module.exports = userModel;
