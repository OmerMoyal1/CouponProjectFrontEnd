export class UserDetailsModel {
  public clientType: string;
  public email: string;
  public password: string;
  public name?: string;

  constructor(clientType: string, email: string, password: string) {
    this.clientType = clientType;
    this.email = email;
    this.password = password;
  }
}

export default UserDetailsModel;
