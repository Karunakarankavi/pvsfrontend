import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-room-availability',
  standalone: true,
  templateUrl: './room-availability.component.html',
  styleUrls: ['./room-availability.component.css']
})
export class RoomAvailabilityComponent implements OnChanges {

  constructor(private apiService: ApiService) {}

  @Input() from: string = '';
  @Input() to: string = '';
  @Input() roomCount: number = 1;
  @Input() roomType: string = 'ac';

  rooms: any[] = []; // start empty

  ngOnChanges(changes: SimpleChanges) {
    // Check if "from" and "to" dates are both available before making API call
    if (this.from && this.to) {

      this.apiService.getAvailableRooms(this.from, this.to).subscribe({
        next: (res: any) => {
          this.rooms = res;
        },
        error: (err: any) => {
          console.error('Error fetching rooms:', err);
          alert('Failed to fetch rooms');
        }
      });
    }
  }
}
