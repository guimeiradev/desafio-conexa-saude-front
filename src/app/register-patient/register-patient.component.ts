import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../shared/services/authentication.service";

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      cpf: ['', Validators.required],
      convenioId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  register() {
    this.form.markAllAsTouched();

    if (this.form.invalid)
      return;

    let username = this.form.controls.username.value;
    let password = this.form.controls.password.value;
    let fullName = this.form.controls.fullName.value;
    let cpf = this.form.controls.cpf.value;
    let convenioId = this.form.controls.convenioId.value;

    this.authService.register({
        username,
        password,
        fullName,
        cpf,
        convenioId
      }
    )
      .pipe(first())
      .subscribe(
        () => {
          console.log("Registered with sucess!");
        },
        error => {
          console.log(error);
        });
  }
}
