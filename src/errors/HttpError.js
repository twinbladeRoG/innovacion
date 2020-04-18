class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code || 400;
  }
}

module.exports = HttpError;
