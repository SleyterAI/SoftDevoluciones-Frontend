import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCookieService } from '../../services/auth-cookie.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly authCookieService = inject(AuthCookieService);

  showPassword = signal<boolean>(false);

  loginForm = this.fb.nonNullable.group({
    email: ['cliente@correo.com', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });

  togglePassword() {
    this.showPassword.update(value => !value);
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const request = this.loginForm.getRawValue();

    this.authCookieService.login(request).subscribe({
      next: () => {
        console.log('Inicio exitoso');
        if (this.authCookieService.isAdmin()) this.router.navigate(['my-orders']);
        else this.router.navigate(['my-returns']);
      },
      error: (error) => {
        console.error('login-form: ', error);
      }
    });
  }

  onForgotPassword(): void {
    console.log('Redirigiendo a recuperación de contraseña...');
  }
}
