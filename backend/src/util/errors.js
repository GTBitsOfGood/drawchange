class SendEmailError extends Error {
  constructor(error) {
    super(`Send Email Error: ${error.message}`);
    this.name = this.constructor.name;
    this.data = { error }
  }
}

class EmailInUseError extends Error {
  constructor(message, email) {
    super(`Email In Use Error: ${message}`);
    this.name = this.constructor.name;
    this.data = { email };
  }
}

module.exports = {
  SendEmailError,
  EmailInUseError
}
