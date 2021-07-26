import {Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg} from "@fullcalendar/angular";
import {AuthenticationService} from "../shared/services/authentication.service";
import {Paciente} from "../shared/dto/paciente";
import {AppointmentResponse} from "../shared/dto/appointment-response";
import {AppointmentService} from "../shared/services/appointment.service";
import {Profissional} from "../shared/dto/profissional";
import {ProfessionalService} from "../shared/services/professional.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppointmentRequest} from "../shared/dto/appointment-request";
import {ToastrService} from "ngx-toastr";
import {TotalAppointments} from "../shared/dto/total-appointments";


@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.scss']
})
export class ListAppointmentComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  user: Paciente;
  appointments: AppointmentResponse[] = [];
  profissionalsAvailable: Profissional[] = [];
  form: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private profissionalService: ProfessionalService,
    private formBuilder: FormBuilder,
    private snackbar: ToastrService
  ) {
    this.user = authService.currentUserValue.user;
    this.form = this.formBuilder.group({
      scheduleDateTime: ['', [Validators.required]],
      profissionalId: ['', Validators.required]
    });
    this.loadAppointmentInCalendar();
    this.profissionalService.listProfessionalsByUser().subscribe(value => {
      this.profissionalsAvailable = value;
    })
  }

  loadAppointmentInCalendar() {
    this.appointmentService.findAppointments().subscribe(value => {
      this.appointments = value;
      this.calendarOptions.events = this.appointments.map(value => {
        return {
          title: value.profissional.fullName,
          date: value.schedule
        }
      })
    });

  }

  submitAppointment() {
    this.form.markAllAsTouched();

    if (this.form.invalid)
      return;

    const appoitmentRequest = new AppointmentRequest(
      this.form.controls.scheduleDateTime.value,
      this.user.id,
      this.form.controls.profissionalId.value,
    )

    this.appointmentService.scheduleAppointment(appoitmentRequest).subscribe(() => {
      this.loadAppointmentInCalendar();
      this.snackbar.success("Consulta agendada com sucesso!");
    });
  }


  ngOnInit(): void {
  }

  exit() {
    this.authService.logout();
  }
}
