import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterPatientComponent} from "./register-patient/register-patient.component";
import {RegisterProfessionalComponent} from "./register-professional/register-professional.component";
import {ListAppointmentComponent} from "./list-appointment/list-appointment.component";
import {AuthGuard} from "./shared/guard/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'cadastrar-paciente',
    component: RegisterPatientComponent,
  },
  {
    path: 'cadastrar-profissional',
    component: RegisterProfessionalComponent
  },
  {
    path: 'agendar',
    component: RegisterProfessionalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listar-agendamentos',
    component: ListAppointmentComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
