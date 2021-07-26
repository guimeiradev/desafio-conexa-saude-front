import {Component, OnInit} from '@angular/core';
import {Profissional} from "../shared/dto/profissional";
import {ProfessionalService} from "../shared/services/professional.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfissionalSave} from "../shared/dto/profissional-save";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-professional',
  templateUrl: './register-professional.component.html',
  styleUrls: ['./register-professional.component.scss']
})
export class RegisterProfessionalComponent implements OnInit {
  professionals: Profissional[] = [];
  form: FormGroup;

  constructor(private professionalService: ProfessionalService,
              private formBuilder: FormBuilder,
              private snackbar: ToastrService
  ) {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      crm: ['', Validators.required],
      conveniosIds: ['', Validators.required]
    });
    this.loadProfessionals();
  }

  ngOnInit(): void {
  }

  loadProfessionals() {
    this.professionalService.listAllProfessionals().subscribe(value => {
      this.professionals = value;
    })
  }

  submitRegisterProfessional() {
    this.form.markAllAsTouched();

    if (this.form.invalid)
      return;

    const profissionalSave = new ProfissionalSave(
      this.form.controls.fullName.value,
      this.form.controls.crm.value,
      [this.form.controls.conveniosIds.value],
    )

    this.professionalService.saveNewProfessional(profissionalSave).subscribe(() => {
      this.loadProfessionals();
      this.snackbar.success("Profissional cadastrado com sucesso!");
    });
  }

}
