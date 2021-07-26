export class Paciente {
  id: number;
  fullName: string;
  cpf: string;
  username: string;
  totalAppointment: number;
  onlineAccessStatus: string;

  constructor(id: number, fullName: string, cpf: string, username: string, totalAppointment: number, onlineAccessStatus: string) {
    this.id = id;
    this.fullName = fullName;
    this.cpf = cpf;
    this.username = username;
    this.totalAppointment = totalAppointment;
    this.onlineAccessStatus = onlineAccessStatus;
  }
}
