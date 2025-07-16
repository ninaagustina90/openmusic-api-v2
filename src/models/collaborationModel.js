const collaborations = [];

const collaborationModel = {
  async add({ id, playlistId, userId }) {
    collaborations.push({ id, playlistId, userId });
    return id;
  },
  async remove({ playlistId, userId }) {
    const idx = collaborations.findIndex((c) => c.playlistId === playlistId && c.userId === userId);
    if (idx !== -1) {
      collaborations.splice(idx, 1);
      return true;
    }
    return false;
  },
  async isCollaborator(playlistId, userId) {
    return collaborations.some((c) => c.playlistId === playlistId && c.userId === userId);
  },
  async findByUser(userId) {
    return collaborations.filter((c) => c.userId === userId);
  },
};

module.exports = collaborationModel;
