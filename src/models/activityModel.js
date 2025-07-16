const activities = [];

const activityModel = {
  async add({ playlistId, username, title, action, time }) {
    activities.push({ playlistId, username, title, action, time });
  },
  async findByPlaylistId(playlistId) {
    return activities.filter((a) => a.playlistId === playlistId);
  },
};

module.exports = activityModel;
