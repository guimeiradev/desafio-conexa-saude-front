import {Profissional} from "./profissional";

export class AppointmentResponse {
  schedule: Date;
  profissional: Profissional;

  constructor(schedule: Date, profissional: Profissional) {
    this.schedule = schedule;
    this.profissional = profissional;
  }
}
