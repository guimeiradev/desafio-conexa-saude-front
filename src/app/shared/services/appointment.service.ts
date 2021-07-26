import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AppointmentResponse} from "../dto/appointment-response";
import {AuthenticationService} from "./authentication.service";
import {AppointmentRequest} from "../dto/appointment-request";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient,
              private authService: AuthenticationService
  ) {
  }

  findAppointments(): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(
      `${environment.backendURL}/consulta?username=${this.authService.currentUserValue.user.username}`);
  }

  scheduleAppointment(appointmentRequest: AppointmentRequest): Observable<void> {
    return this.http.post<void>(`${environment.backendURL}/consulta/agendar`, appointmentRequest);
  }


}
