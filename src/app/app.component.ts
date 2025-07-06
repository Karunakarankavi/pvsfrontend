import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from '../assets/config.service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'res_pvs';

  constructor(private configService: ConfigService , private apiService : ApiService) {}

  ngOnInit(): void {
     
//     this.apiService.signup("karunakarankavitha3@gmail.com" , "Kavitha@3").subscribe({
//   next: (res) => console.log('Signup success:', res),
//   error: (err) => console.error('Signup error:', err)
// });


  }
}
