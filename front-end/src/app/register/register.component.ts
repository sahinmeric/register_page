import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true, // Mark the component as standalone
  imports: [FormsModule], // Include FormsModule here
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

  onSubmit() {
    if (this.form.password !== this.form.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log('Form Submitted', this.form);
  }
}
