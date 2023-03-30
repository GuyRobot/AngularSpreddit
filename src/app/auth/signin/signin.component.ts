import { SigninPayload } from './signin.payload';
import { AuthService } from './../shared/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup = new FormGroup({});
  signinPayload: SigninPayload;

  constructor(private authService: AuthService) {
    this.signinPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  signin() {
    this.signinPayload.username = this.signinForm.get('username')?.value || '';
    this.signinPayload.password = this.signinForm.get('password')?.value || '';

    this.authService
      .signin(this.signinPayload)
      .subscribe((res) => console.log(res));
  }
}
