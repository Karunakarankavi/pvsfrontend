import { Component, OnInit } from '@angular/core';
import { UserInformation } from './user-information.model';
import { ApiService } from '../../api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  imports :[ReactiveFormsModule , FormsModule],
    standalone: true,

})
export class UserDetailsComponent implements OnInit {
  user!: UserInformation;
  isEditing = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    
  this.apiService.getUser().subscribe({
        next: (res: any) => {
          console.log(res)
          this.user = res?.informations
        },
        error: (err: any) => {
          console.error('Error fetching rooms:', err);
          alert('Failed to fetch rooms');
        }
      });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  save(): void {
    console.log(this.user);
    
    this.apiService.updateUser(this.user).subscribe({
        next: (res: any) => {
          console.log(res)
          this.isEditing = false
        },
        error: (err: any) => {
          console.error('Error fetching rooms:', err);
          alert('Failed to fetch rooms');
        }
      });
  }
}
