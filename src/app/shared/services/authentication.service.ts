import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {PacienteRegisterRequest} from "../dto/paciente-register-request";
import {UserAuthResponse} from "../dto/user-auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserAuthResponse>;
  public currentUser: Observable<UserAuthResponse>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<UserAuthResponse>(JSON.parse(<string>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserAuthResponse {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${environment.backendURL}/auth/login`, {username, password})
      .pipe(map(userResult => {
        localStorage.setItem('currentUser', JSON.stringify(userResult));
        this.currentUserSubject.next(userResult);
        this.router.navigate(['listar-agendamentos']);
        return userResult;
      }));
  }

  register(user: PacienteRegisterRequest) {
    return this.http.post<UserAuthResponse>(`${environment.backendURL}/auth/cadastrar`, user)
      .pipe(map(userResult => {
        localStorage.setItem('currentUser', JSON.stringify(userResult));
        this.currentUserSubject.next(userResult);
        this.router.navigate(['listar-agendamentos']);
        return userResult;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
