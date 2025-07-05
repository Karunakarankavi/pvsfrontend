import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../../app/api.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css'],
  imports: [SharedModule]
})
export class AuthDialogComponent {
  authForm: FormGroup;
  verificationForm: FormGroup;
  isSignup = false;
  isVerifying = false;
  userEmail = '';
  password = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private router: Router,
    private apiService: ApiService
  ) {
      console.log('apiService exists?', !!this.apiService);

    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.verificationForm = this.fb.group({
      code: ['', Validators.required]
    });
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.isSignup = !this.isSignup;
    this.isVerifying = false;
  }

  onSubmit() {
    const { username, password } = this.authForm.value;
    this.userEmail = username;
    this.password = password;

    if (this.isSignup) {
      this.apiService.signup(username, password).subscribe({
        next: (res:any) => {
          console.log('Signup success', res);
          this.isVerifying = true;
        },
        error: (err:any) => {
          console.error('Signup failed', err);
          alert('Signup failed: ' + err.error?.message || 'Unknown error');
        }
      });
    } else {
      console.log("else")
      this.apiService.signin(username, password).subscribe({
        next: (res:any) => {
          window.sessionStorage.setItem("accessToken" , res.AuthenticationResult.AccessToken )
          let body = {
            name : this.userEmail
           }
           this.apiService.saveUser(body).subscribe({
        next: (res:any) => {
 
        },
        error: (err:any) => {
        }
      });
          this.dialogRef.close()
          this.router.navigate(['/dashboard']);
 
        },
        error: (err:any) => {
          console.error('Signup failed', err);
          alert('Signup failed: ' + err.error?.message || 'Unknown error');
        }
      });
      
    }
  }

  verifyCode() {
    const { code } = this.verificationForm.value;

    this.apiService.verify(this.userEmail, code).subscribe({
      next: (res:any) => {
        this.apiService.signin(this.userEmail, this.password).subscribe({
        next: (res:any) => {
          window.sessionStorage.setItem("accessToken" , res.AuthenticationResult.AccessToken )
           let body = {
            name : this.userEmail
           }
          this.apiService.saveUser(body).subscribe({
        next: (res:any) => {
 
        },
        error: (err:any) => {
        }
      });
          this.dialogRef.close()
          this.router.navigate(['/dashboard']);
 
        },
        error: (err:any) => {
          console.error('Signup failed', err);
          alert('Signup failed: ' + err.error?.message || 'Unknown error');
        }
      });
      },
      error: (err:any) => {
        console.error('Verification failed', err);
        alert('Verification failed: ' + err.error?.message || 'Unknown error');
      }
    });
  }
}
