import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../shared/services/authentication.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.form.markAllAsTouched();

    if (this.form.invalid)
      return;

    let username = this.form.controls.username.value;
    let password = this.form.controls.password.value;

    this.authService.login(username, password)
      .pipe(first())
      .subscribe(
        () => {
          console.log("Authenticated with sucess!");
        },
        error => {
          console.log(error);
        });
  }
}
