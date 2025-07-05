import { Component } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  constructor(private dialog: MatDialog){

  }
  openAuthDialog() {
    this.dialog.open(AuthDialogComponent, {
      width: '40%',
      height : '60%',
      
    });
  }

}
