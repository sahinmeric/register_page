import { provideRouter, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirect to /register by default
  // Other routes can be added here
];

export const appRoutingProviders: any[] = [];

export const routing = provideRouter(appRoutes);
