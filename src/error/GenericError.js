class GenericError extends Error {
  constructor(message, genericOptions, options = {}) {
    super(message, options);
    this.status = genericOptions.status;
    this.genericOptions = { ...genericOptions };
  }
}

export default GenericError;
