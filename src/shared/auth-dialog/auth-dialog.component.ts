import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['']
    });

    this.verificationForm = this.fb.group({
      code: ['', Validators.required]
    });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const form = control as FormGroup;
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { mismatch: true };
}

 toggleMode(event: Event) {
  event.preventDefault();
  this.isSignup = !this.isSignup;
  this.isVerifying = false;

  if (this.isSignup) {
    this.authForm.setValidators(this.passwordMatchValidator);
  } else {
    // Clear validators and reset confirmPassword when switching to Sign In
    this.authForm.clearValidators();
    this.authForm.get('confirmPassword')?.setValue('');
    this.authForm.get('confirmPassword')?.setErrors(null);
  }

  this.authForm.updateValueAndValidity();
}


  parseJwt(token: any): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token');
    }
    const payload = parts[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  }

  onSubmit() {
    const { username, password } = this.authForm.value;
    this.userEmail = username;
    this.password = password;

    if (this.isSignup && this.authForm.errors?.['mismatch']) {
      alert('Passwords do not match');
      return;
    }

    if (this.isSignup) {
      this.apiService.signup(username, password).subscribe({
        next: (res: any) => {
          this.isVerifying = true;
        },
        error: (err: any) => {
          console.error('Signup failed', err);
          alert('Signup failed: ' + (err.error?.message || 'Unknown error'));
        }
      });
    } else {
      this.apiService.signin(username, password).subscribe({
        next: (res: any) => {
          window.sessionStorage.setItem("accessToken", res.AuthenticationResult.AccessToken);
          const payload = this.parseJwt(res.AuthenticationResult.AccessToken);
          const userId = payload.sub;
          window.sessionStorage.setItem("userId", userId);

          let body = { name: this.userEmail };
          this.dialogRef.close();
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          console.error('Signin failed', err);
          alert('Signin failed: ' + (err.error?.message || 'Unknown error'));
        }
      });
    }
  }

  verifyCode() {
    const { code } = this.verificationForm.value;

    this.apiService.verify(this.userEmail, code).subscribe({
      next: (res: any) => {
        this.apiService.signin(this.userEmail, this.password).subscribe({
          next: (res: any) => {
            window.sessionStorage.setItem("accessToken", res.AuthenticationResult.AccessToken);
            let body = { name: this.userEmail };

            this.apiService.saveUser(body).subscribe({
              next: () => {},
              error: () => {}
            });

            this.dialogRef.close();
            this.router.navigate(['/dashboard']);
          },
          error: (err: any) => {
            console.error('Signin failed', err);
            alert('Signin failed: ' + (err.error?.message || 'Unknown error'));
          }
        });
      },
      error: (err: any) => {
        console.error('Verification failed', err);
        alert('Verification failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}
