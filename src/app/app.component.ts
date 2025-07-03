import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from '../assets/config.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'res_pvs';

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    console.log('Client ID:', this.configService.get('cognitoClientId'));
    console.log('Client Secret:', this.configService.get('cognitoClientSecret'));
  }
}
