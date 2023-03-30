import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
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
  registerMessage: string = '';
  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRouter: ActivatedRoute
  ) {
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

    this.activatedRouter.queryParams.subscribe((params) => {
      if (params['registered'] !== undefined && params['registered'] === true) {
        this.toastr.success('Signup succeed!');
        this.registerMessage =
          'Please check your email for activation link to activate your account before you can signin';
      }
    });
  }

  signin() {
    this.signinPayload.username = this.signinForm.get('username')?.value || '';
    this.signinPayload.password = this.signinForm.get('password')?.value || '';

    this.authService.signin(this.signinPayload).subscribe((success) => {
      if (success) {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Signin succeed!');
      } else {
        this.isError = true;
      }
    });
  }
}
