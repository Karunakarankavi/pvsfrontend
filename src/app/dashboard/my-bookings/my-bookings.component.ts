import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-my-bookings',
  imports: [ConfirmModalComponent],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
   bookings: any; // Or fetch from service in real use
    showModal = false;
  selectedBookingId: number | null = null;

  constructor(private apiService : ApiService)
 {

 }

  ngOnInit(): void {
    
  this.apiService.getAllBookings().subscribe({
        next: (res: any) => {
          console.log(res)
          this.bookings= res
        },
        error: (err: any) => {
          console.error('Error fetching rooms:', err);
          alert('Failed to fetch rooms');
        }
      });
  }


  cancelBooking(id: number) {
     const confirmed = confirm('Are you sure you want to cancel this booking?');
  if (confirmed) {
    console.log('Cancelling booking with ID:', id);
    // Call your service to cancel the booking
  } else {
    console.log('Cancelled action');
  }
  }

 

  openCancelModal(id: number) {
    this.selectedBookingId = id;
    this.showModal = true;
  }

  confirmCancel() {
    console.log('Booking cancelled:', this.selectedBookingId);
    this.apiService.deleteBooking(this.selectedBookingId).subscribe({
        next: (res: any) => {
          console.log(res)
          if(res.status == "success"){
           this.bookings =  this.bookings.filter((item:any)=>{
            item.id != this.selectedBookingId
           })
          }
        },
        error: (err: any) => {
          console.error('Error fetching rooms:', err);
          alert('Failed to fetch rooms');
        }
      });
    // Call your API here to cancel
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.selectedBookingId = null;
  }

  
 

  seeDetails(booking: any) {
  console.log('Booking details:', booking);
  // You can open a modal, side panel, or navigate to detail page
}


}
