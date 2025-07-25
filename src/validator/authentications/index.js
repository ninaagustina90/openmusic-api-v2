const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require('./schema');
const InvariantError = require('../../exceptions/invariantError');

const AuthenticationsValidator = {
  validatePostAuthenticationPayload(payload) {
    const { error } = PostAuthenticationPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },

  validatePutAuthenticationPayload(payload) {
    const { error } = PutAuthenticationPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },

  validateDeleteAuthenticationPayload(payload) {
    const { error } = DeleteAuthenticationPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = AuthenticationsValidator;
