export class AppointmentRequest {
  scheduleDateTime: Date;
  pacienteId: number;
  profissionalId: number;

  constructor(scheduleDateTime: Date, pacienteId: number, profissionalId: number) {
    this.scheduleDateTime = scheduleDateTime;
    this.pacienteId = pacienteId;
    this.profissionalId = profissionalId;
  }
}
