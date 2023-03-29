import { AuthService } from './../shared/auth.service';
import { SignupPayload } from './signup.payload';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  signupPayload: SignupPayload;

  constructor(private authService: AuthService) {
    this.signupPayload = {
      username: '',
      email: '',
      password: '',
    };
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signup() {
    this.signupPayload.username = this.signupForm.get('username')?.value || '';
    this.signupPayload.email = this.signupForm.get('email')?.value || '';
    this.signupPayload.password = this.signupForm.get('password')?.value || '';

    this.authService
      .signup(this.signupPayload)
      .subscribe((res) => console.log(res));
  }
}
