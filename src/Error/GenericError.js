class GenericError extends Error {
  constructor(message, options, genericOptions) {
    super(message, options);
    this.status = genericOptions.status;
    this.genericOptions = { ...genericOptions };
  }
}

export default GenericError;
