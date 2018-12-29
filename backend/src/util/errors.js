export class SendEmailError extends Error {
  constructor(error) {
    super(error.message);
    this.name = this.constructor.name;
    this.data = { error }
  }
}

export class EmailInUseError extends Error {
  constructor(message, email) {
    super(message);
    this.name = this.constructor.name;
    this.data = { email };
  }
}
