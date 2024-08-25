import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  form = {
    nit: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    dataPolicyAccepted: false,
  };

  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordsMismatch(): boolean {
    return this.form.password !== this.form.confirmPassword;
  }

  isPasswordValid(): boolean {
    const password = this.form.password;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  }

  onSubmit() {
    if (this.passwordsMismatch()) {
      this.snackBar.open('Las contraseñas no coinciden.', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    if (!this.isPasswordValid()) {
      return;
    }

    this.isSubmitting = true;

    const formData = {
      NIT: this.form.nit,
      Email: this.form.email,
      PhoneNumber: this.form.phone,
      Password: this.form.password,
    };

    // Send the form data to the backend
    this.http.post('https://localhost:7101/api/register', formData).subscribe({
      next: (response: any) => {
        this.snackBar.open('Usuario registrado exitosamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });

        if (response.token) {
          sessionStorage.setItem('token', response.token);
        }

        this.router.navigate(['/login']);
        this.isSubmitting = false;
      },
      error: (error) => {
        this.snackBar.open(
          'Error al registrar. Por favor, inténtalo de nuevo.',
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
