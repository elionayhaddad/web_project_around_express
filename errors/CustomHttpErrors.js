class CustomHttpErrors extends Error {
  constructor(message, name, status) {
    super(message);
    this.name = name;
    this.status = status || 500;
  }
}

module.exports = CustomHttpErrors;
