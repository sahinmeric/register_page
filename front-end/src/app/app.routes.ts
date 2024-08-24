import { provideRouter, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  // Other routes can be added here
];

export const appRoutingProviders: any[] = [];

export const routing = provideRouter(appRoutes);
