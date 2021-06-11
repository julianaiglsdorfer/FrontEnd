export class User {
  public username: string = '';
  public password: string | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;
  public token: string | undefined;

  constructor(
  ) {
  }

  set setUsername(value: string) {
    this.username = value;
  }

  set setPassword(value: string) {
    this.password = value;
  }

  set setFirstName(value: string) {
    this.firstName = value;
  }

  set setLastName(value: string) {
    this.lastName = value;
  }

  set setToken(value: string) {
    this.token = value;
  }
}
