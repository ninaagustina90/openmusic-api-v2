const mapDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => {
  return {
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId: album_id,
  };
};

module.exports = { mapDBToModel };
