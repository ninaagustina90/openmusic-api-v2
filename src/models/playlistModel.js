const playlists = [];

const playlistModel = {
  async create({ id, name, owner }) {
    playlists.push({ id, name, owner, songs: [] });
    return id;
  },
  async findByOwner(owner) {
    return playlists.filter((p) => p.owner === owner);
  },
  async findById(id) {
    return playlists.find((p) => p.id === id);
  },
  async deleteById(id) {
    const idx = playlists.findIndex((p) => p.id === id);
    if (idx !== -1) {
      playlists.splice(idx, 1);
      return true;
    }
    return false;
  },
  async addSong(playlistId, songId) {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (playlist) {
      playlist.songs.push(songId);
      return true;
    }
    return false;
  },
  async removeSong(playlistId, songId) {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (playlist) {
      const idx = playlist.songs.indexOf(songId);
      if (idx !== -1) {
        playlist.songs.splice(idx, 1);
        return true;
      }
    }
    return false;
  },
};

module.exports = playlistModel;
