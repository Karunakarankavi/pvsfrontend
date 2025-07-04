// src/app/config.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

 loadConfig(): Promise<void> {
  return fetch('assets/config.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Config file not found');
      }
      return response.json();
    })
    .then(config => {
      this.config = config;
    })
    .catch(error => {
      console.error('Failed to load config.json:', error);
    });
}


  get(key: string): string {
    return this.config?.[key];
  }
}
