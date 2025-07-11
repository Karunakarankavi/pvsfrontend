import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomAvailabilityComponent } from './room-availability/room-availability.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, RoomAvailabilityComponent , ClickOutsideDirective , MyBookingsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 

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
    this.componentName = component
  }

  logout() {
    // implement logout logic here (e.g., AuthService.logout())
    console.log('Logging out...');
  }
}
