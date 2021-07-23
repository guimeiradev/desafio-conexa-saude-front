export class User {
  fullName: string;
  cpf: string;
  convenioId: string;
  password: string;
  username: string;

  constructor(fullName: string, cpf: string, convenioId: string, password: string, username: string) {
    this.fullName = fullName;
    this.cpf = cpf;
    this.convenioId = convenioId;
    this.password = password;
    this.username = username;
  }
}

export class UserAuthResponse {
  token?: String;
}
