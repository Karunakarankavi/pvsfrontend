import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../../shared/auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-landing',
  imports: [HeaderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private dialog: MatDialog){

  }


openAuthDialog() {
  this.dialog.open(AuthDialogComponent, {
    width: '40%',
    height : '60%',
    
  });
}
}
