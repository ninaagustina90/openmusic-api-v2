function errorHandler(err, h) {
  // Validation error (Joi or custom)
  if (err.isJoi || err.message?.toLowerCase().includes('validation')) {
    return h.response({ status: 'fail', message: err.message || 'Invalid request' }).code(400);
  }
  // Not found
  if (err.message?.toLowerCase().includes('not found')) {
    return h.response({ status: 'fail', message: err.message || 'Resource not found' }).code(404);
  }
  // Unauthorized
  if (err.message?.toLowerCase().includes('unauthorized') || err.message?.toLowerCase().includes('missing authorization')) {
    return h.response({ status: 'fail', message: err.message || 'Unauthorized' }).code(401);
  }
  // Forbidden
  if (err.message?.toLowerCase().includes('forbidden')) {
    return h.response({ status: 'fail', message: err.message || 'Forbidden' }).code(403);
  }
  // Invalid refresh token
  if (err.message?.toLowerCase().includes('refresh token')) {
    return h.response({ status: 'fail', message: err.message || 'Invalid refresh token' }).code(400);
  }
  // Default: server error
  return h.response({ status: 'error', message: err.message || 'Internal server error' }).code(500);
}

module.exports = errorHandler;
