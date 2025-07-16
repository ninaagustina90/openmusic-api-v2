const albums = [];

const albumModel = {
  async create({ id, name, year }) {
    albums.push({ id, name, year });
    return id;
  },
  async findById(id) {
    return albums.find((a) => a.id === id);
  },
  async findAll() {
    return albums;
  },
};

module.exports = albumModel;
