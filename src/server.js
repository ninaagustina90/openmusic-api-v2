require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const ClientError = require('./exceptions/clientError');

// 🔌 Plugins API dan layanan
const albums = require('./api/albums');
const songs = require('./api/songs');
const users = require('./api/users');
const playlists = require('./api/playlists');
const authentications = require('./api/authentications');
const collaborations = require('./api/collaborations');

// 🧠 Services
const AlbumsService = require('./services/postgres/AlbumsService');
const SongsService = require('./services/postgres/SongsService');
const UsersService = require('./services/postgres/UsersService');
const PlaylistsService = require('./services/postgres/PlaylistsServices');
const AuthenticationsService = require('./services/postgres/AuthService');
const CollaborationsService = require('./services/postgres/CollaborationsService');

// 🛡️ Validator
const AlbumsValidator = require('./validator/albums');
const SongsValidator = require('./validator/songs');
const UsersValidator = require('./validator/users');
const PlaylistsValidator = require('./validator/playlists');
const AuthenticationsValidator = require('./validator/authentications');
const CollaborationsValidator = require('./validator/collaborations');

// 🔑 Token utility
const TokenManager = require('./tokenize/tokenManager');

const init = async () => {
  // 🧩 Inisialisasi service
  const collaborationsService = new CollaborationsService();
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const playlistsService = new PlaylistsService(collaborationsService);
  const authenticationsService = new AuthenticationsService();

  // 🌐 Setup server
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // 🔐 Registrasi plugin eksternal
  await server.register(Jwt);

  // 🛡️ Strategi autentikasi
  server.auth.strategy('openmusicapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY || 'default_key_fallback',
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: parseInt(process.env.ACCESS_TOKEN_AGE, 10) || 14400,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: { id: artifacts.decoded.payload.id },
    }),
  });

  // 🧩 Registrasi plugin internal
  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        playlistsService,
        songsService,
        validator: PlaylistsValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistsService,
        usersService,
        validator: CollaborationsValidator,
      },
    },
  ]);

  // ⚠️ Error handler global
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: response.message,
          })
          .code(response.statusCode);
      }

      if (!response.isServer) {
        return h.continue;
      }

      return h
        .response({
          status: 'error',
          message: 'Terjadi kegagalan pada server kami',
          // detail: response.message, // Uncomment saat debugging
        })
        .code(500);
    }

    return h.continue;
  });

  // 🚀 Jalankan server
  await server.start();
  console.log(`✅ Server berjalan di ${server.info.uri}`);
};

init();
