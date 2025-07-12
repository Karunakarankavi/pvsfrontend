import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomAvailabilityComponent } from './room-availability/room-availability.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { Router } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, RoomAvailabilityComponent , ClickOutsideDirective , MyBookingsComponent , UserDetailsComponent ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 
    constructor(private router: Router) {}

  dropdownOpen = false;
  componentName:string = "search"

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  route(component:string){
   console.log(component);
    console.log("routing")
      this.closeDropdown(); // ✅ close dropdown after click

    this.componentName = component
  }

  logout() {
        console.log('Logging out...');

    // implement logout logic here (e.g., AuthService.logout())
    this.router.navigate(['/'])
  }
}
