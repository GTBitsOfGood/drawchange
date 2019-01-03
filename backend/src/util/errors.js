/**
 * Sendgrid failed to send email
 */
class SendEmailError extends Error {
  constructor(error) {
    super(`Send Email Error: ${error.message}`);
    this.name = this.constructor.name;
    this.data = { error }
  }
}

/**
 * User submitted non-unique email
 */
class EmailInUseError extends Error {
  constructor(message, email) {
    super(`Email In Use Error: ${message}`);
    this.name = this.constructor.name;
    this.data = { email };
  }
}

/**
 * Failed to subscribe a user to mailchip subscription list
 */
class SubscribeUserError extends Error {
  constructor(error) {
    super(`Subscribe User Error: ${error.message}`);
    this.name = this.constructor.name;
    this.data = { error }
  }
}

module.exports = {
  SendEmailError,
  EmailInUseError,
  SubscribeUserError
}
