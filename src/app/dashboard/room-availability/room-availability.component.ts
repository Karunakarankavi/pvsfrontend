import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../api.service';

  declare var Razorpay: any;

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

  bookRoom(){

    this.apiService.createOrder(100).subscribe({
        next: (res: any) => {
          console.log(res)
          this.openTransaction(res)
        },
        error: (err: any) => {
          console.error('Error fetching rooms:', err);
          alert('Failed to fetch rooms');
        }
      });

  }

  openTransaction(res:any){
    var option = {
      order_id : res?.id,
      key : "rzp_test_U7jrfJC8wzR3Mh",
      amount : res?.amount,
      currency : res?.currency,
      name : "PVS",
      description : "Paying for pvs",
      image : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fpvs-letter-logo-design-template-vector-1683624163&psig=AOvVaw34jLXdnj_X-hmNfypefKee&ust=1751909633742000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKitvY3iqI4DFQAAAAAdAAAAABAE",
      handler : (response : any)=>{

      },
      prefill :{
        name : "karna",
        email : "karna3@gmail.com",
      },
      notes :{
        address : "online"
      },
      theme:{
        color : '#f37254'
      }
    }

    var razorpayObject = new Razorpay(option);
    razorpayObject.open()
  }
}
