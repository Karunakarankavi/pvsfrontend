import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyBookingsComponent } from './dashboard/my-bookings/my-bookings.component';

export const routes: Routes = [
     { path: '', component: LandingComponent },
     { path: 'dashboard', component: DashboardComponent },
   
];
