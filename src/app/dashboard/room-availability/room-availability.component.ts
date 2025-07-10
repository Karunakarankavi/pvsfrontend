import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

  declare var Razorpay: any;

@Component({
  selector: 'app-room-availability',
  standalone: true,
    imports: [ReactiveFormsModule],

  templateUrl: './room-availability.component.html',
  styleUrls: ['./room-availability.component.css']
})

export class RoomAvailabilityComponent implements OnChanges {
  


  constructor(private apiService: ApiService) {}

  @Input() from: string = '';
  @Input() to: string = '';
 
  roomId! :String

  rooms: any[] = []; // start empty

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
      this.apiService.getAvailableRooms(this.fromDate, this.toDate).subscribe({
        next: (res: any) => {
          this.rooms = res;
        },
        error: (err: any) => {
          console.error('Error fetching rooms:', err);
          alert('Failed to fetch rooms');
        }
      });
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

  bookRoom(room:any){
     this.roomId = room.room_id;
    this.apiService.createOrder(100).subscribe({
        next: (res: any) => {
          this.openTransaction(res)
        },
        error: (err: any) => {
          console.error('Error fetching rooms:', err);
          alert('Failed to fetch rooms');
        }
      });

  }

  openTransaction(res: any) {
    let userId = window.sessionStorage.getItem("userId")
  var option = {
    order_id: res?.id,
    key: "rzp_test_U7jrfJC8wzR3Mh",
    amount: res?.amount,
    currency: res?.currency,
    name: "PVS",
    description: "Paying for pvs",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fpvs-letter-logo-design-template-vector-1683624163&psig=AOvVaw34jLXdnj_X-hmNfypefKee&ust=1751909633742000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKitvY3iqI4DFQAAAAAdAAAAABAE",
    handler: (response: any) => {
       const paymentData = {
    
    razorpayOrderId: response.razorpay_order_id,
    razorpayPaymentId: response.razorpay_payment_id,
    razorpaySignature: response.razorpay_signature,
    bookingRequest: {
      roomId: this.roomId,
      checkIn: this.fromDate,
      checkOut: this.toDate,
      userId : userId
    }
  };

  this.apiService.confromAndBooK(paymentData).subscribe({
        next: (res: any) => {
          
        },
        error: (err: any) => {
          console.error('Error fetching rooms:', err);
          alert('Failed to fetch rooms');
        }
      });
      
    },
    modal: {
      ondismiss: function () {
        // TODO: Handle UI update or cancellation logic here
      }
    },
    prefill: {
      name: "karna",
      email: "karna3@gmail.com",
    },
    notes: {
      address: "online"
    },
    theme: {
      color: '#f37254'
    }
  };

  var razorpayObject = new Razorpay(option);
  razorpayObject.open();
}
}
