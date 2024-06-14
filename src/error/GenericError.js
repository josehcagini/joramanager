import { StatusCodes } from 'http-status-codes';

class GenericError extends Error {
  constructor(message, genericOptions, options = {}) {
    super(message, options);
    this.status = genericOptions.status || StatusCodes.INTERNAL_SERVER_ERROR;
    this.genericOptions = { ...genericOptions };
  }

  static getJsonError(error, paths = { home: '/' }) {
    return {
      error: {
        message: error.message,
        ...error,
      },
      paths,
    };
  }

  static getStatusCode(error) {
    return error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export default GenericError;
