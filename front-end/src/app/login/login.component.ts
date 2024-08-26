import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  form = {
    username: '',
    password: '',
  };

  showPassword = false;
  isSubmitting = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.isSubmitting = true;

    const loginData = {
      Username: this.form.username,
      Password: this.form.password,
    };

    this.http
      .post(
        'https://mydotnetapp23423.azurewebsites.net/api/auth/token',
        loginData
      )
      .subscribe({
        next: (response: any) => {
          if (response.token) {
            sessionStorage.setItem('token', response.token);
            this.snackBar.open('Inicio de sesión exitoso.', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
            this.router.navigate(['/dashboard']); // Redirect to your dashboard or another page
          } else {
            this.snackBar.open('Error: No se recibió el token.', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          this.snackBar.open(
            'Error al iniciar sesión. Por favor, inténtalo de nuevo.',
            'Cerrar',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
            }
          );
          this.isSubmitting = false;
        },
      });
  }
}
