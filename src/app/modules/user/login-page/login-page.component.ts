import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loading = false;
  serverMessage!: string | unknown;

  user: Observable<any>;
  form: FormGroup;

  errorMessage: string;

  constructor(
    public afAuth: AngularFireAuth,
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['' as string, [Validators.required, Validators.email]],
      password: ['' as string, [Validators.minLength(6), Validators.required]],
    }) as FormGroup;

    // Define user
    this.user = this.afAuth.authState;
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      this.auth.login(email, password);
      console.log('Logged in');
      this.loading = false;
      this.router.navigate(['/']);

      // await console.log('123');
    } catch (error) {
      this.serverMessage = error;
    }
  }
}
