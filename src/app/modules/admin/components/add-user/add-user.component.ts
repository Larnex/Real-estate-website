import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['../add-property/add-property.component.scss'],
})
export class AddUserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addFormControls();
  }

  addFormControls(): void {
    this.form = this.fb.group({
      uid: ['0' as string, Validators.required],
      email: ['' as string, [Validators.required, Validators.email]],
      roles: this.fb.group({
        admin: [false as boolean, Validators.required],
        registered: [true as boolean, Validators.required],
      }) as FormGroup,
      password: ['' as string, Validators.required],
    });
  }

  formSubmit(): void {
    if (this.form.invalid as boolean) {
      console.log('form is invalid', this.form.value);
      return;
    }

    this.authService.createUser(this.form.value as User);

    console.log('form is valid', this.form.valid as boolean);
  }
}
