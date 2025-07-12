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
  const dialogRef = this.dialog.open(AuthDialogComponent, {
  width: '40%',
  height: '70%',
});

dialogRef.afterClosed().subscribe(result => {
  if(result){
    this.openAuthDialog()
  }
  // Handle the result here
});



}
}
