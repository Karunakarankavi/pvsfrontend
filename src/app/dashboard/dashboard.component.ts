import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomAvailabilityComponent } from './room-availability/room-availability.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, RoomAvailabilityComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchForm = new FormGroup({
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    roomCount: new FormControl(1),
    roomType: new FormControl('ac')
  });

  searchClicked = false;

  onSearch() {
    if (this.searchForm.valid) {
      this.searchClicked = true;
    } else {
      alert('Please select both dates.');
    }
  }

  // convenience getters
  get fromDate(): string {
  return this.searchForm.get('fromDate')?.value ?? '';
}

get toDate(): string {
  return this.searchForm.get('toDate')?.value ?? '';
}

get roomCount(): number {
  return Number(this.searchForm.get('roomCount')?.value ?? 1);
}

get roomType(): string {
  return this.searchForm.get('roomType')?.value ?? 'ac';
}
}
