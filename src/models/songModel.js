const songs = [
  { id: 'song-1', title: 'Song One' },
  { id: 'song-2', title: 'Song Two' },
];

const songModel = {
  async exists(songId) {
    return songs.some((s) => s.id === songId);
  },
  async get(songId) {
    return songs.find((s) => s.id === songId);
  },
};

module.exports = songModel;
