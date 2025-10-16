export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    user.email === ""
      ? (this.email = this.generateUserEmail(user.firstName, user.lastName))
      : (this.email = user.email);
    this.password = user.password;
  }

  private generateUserEmail(firstName: string, lastName: string): string {
    let emailName = firstName.substring(0, 2).toLowerCase();
    let emailLastName = lastName.toLowerCase();
    return `${emailName}${emailLastName}${Date.now()}@test.com`;
  }
}
