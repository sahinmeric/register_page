import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  passwordsMismatch(): boolean {
    return this.form.password !== this.form.confirmPassword;
  }

  showPassword = false;
  showConfirmPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.form.password !== this.form.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log('Form Submitted', this.form);
    // TODO: send the form data to the backend
  }
}
