import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordsMismatch(): boolean {
    return this.form.password !== this.form.confirmPassword;
  }

  onSubmit() {
    if (this.passwordsMismatch()) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const formData = {
      NIT: this.form.nit,
      Email: this.form.email,
      PhoneNumber: this.form.phone,
      Password: this.form.password,
    };

    // Send the form data to the backend
    this.http.post('https://localhost:7101/api/register', formData).subscribe(
      (response: any) => {
        console.log('Form Submitted Successfully', response);
        alert(response.message);

        if (response.token) {
          sessionStorage.setItem('token', response.token);
        }

        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error submitting form', error);
        alert('Error submitting form. Please try again.');
      }
    );
  }
}
