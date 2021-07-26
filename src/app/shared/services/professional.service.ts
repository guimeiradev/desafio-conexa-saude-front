import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Profissional} from "../dto/profissional";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {ProfissionalSave} from "../dto/profissional-save";

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  constructor(private http: HttpClient,
              private authService: AuthenticationService
  ) {
  }

  saveNewProfessional(professionalSave: ProfissionalSave): Observable<Profissional[]> {
    return this.http.post<Profissional[]>(
      `${environment.backendURL}/profissionais`, professionalSave);
  }


  listProfessionalsByUser(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(
      `${environment.backendURL}/profissionais/paciente?username=${this.authService.currentUserValue.user.username}`);
  }

  listAllProfessionals(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(
      `${environment.backendURL}/profissionais`);
  }

}
