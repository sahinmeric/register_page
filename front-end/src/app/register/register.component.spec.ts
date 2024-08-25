import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        MatSnackBarModule, // Import necessary Material module
        NoopAnimationsModule, // Import this if you don't want to use animations in tests
      ],
      providers: [
        provideHttpClient(), // Provide HttpClient
        provideRouter([]), // Provide Router (you can adjust the routes if needed)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error when passwords do not match', () => {
    component.form.password = 'password123';
    component.form.confirmPassword = 'password124';
    component.onSubmit();
    expect(component.passwordsMismatch()).toBeTrue();
  });

  it('should enable the submit button when the form is valid', async () => {
    component.form.nit = '123456789';
    component.form.email = 'test@example.com';
    component.form.phone = '1234567890';
    component.form.password = 'Password123';
    component.form.confirmPassword = 'Password123';
    component.form.termsAccepted = true;
    component.form.dataPolicyAccepted = true;

    // Ensure all fields are valid
    expect(component.passwordsMismatch()).toBeFalse();
    expect(component.form.nit).toBeTruthy();
    expect(component.form.email).toBeTruthy();
    expect(component.form.phone).toBeTruthy();
    expect(component.form.termsAccepted).toBeTrue();
    expect(component.form.dataPolicyAccepted).toBeTrue();

    // Set isSubmitting to false to ensure the button can be enabled
    component.isSubmitting = false;

    // Trigger change detection
    fixture.detectChanges();
    await fixture.whenStable(); // Wait for any pending asynchronous tasks

    // Check if the button is enabled
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeFalse();
  });

  it('should call the onSubmit method when the form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should show a snackbar message on successful registration', () => {
    // Mocking the HTTP response
    spyOn(component.snackBar, 'open');
    spyOn(component.http, 'post').and.returnValue(
      of({ message: 'User registered successfully', token: 'dummy-token' })
    );

    component.form.nit = '123456789';
    component.form.email = 'test@example.com';
    component.form.phone = '1234567890';
    component.form.password = 'Password123';
    component.form.confirmPassword = 'Password123';
    component.form.termsAccepted = true;
    component.form.dataPolicyAccepted = true;

    component.onSubmit();

    expect(component.snackBar.open).toHaveBeenCalledWith(
      'Usuario registrado exitosamente.',
      'Cerrar',
      {
        duration: 3000,
        panelClass: ['snackbar-success'],
      }
    );
  });

  it('should disable the submit button when the form is invalid', () => {
    component.form.nit = '';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });
});
