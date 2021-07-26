import {Paciente} from "./paciente";

export class UserAuthResponse {
  token: String;
  user: Paciente;

  constructor(token: String, paciente: Paciente) {
    this.token = token;
    this.user = paciente;
  }
}
