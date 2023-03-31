import { SigninResponsePayload } from './../signin/signin.response.payload';
import { SignupPayload } from './../signup/signup.payload';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { SigninPayload } from '../signin/signin.payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'http://localhost:8080/api/auth';

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  signup(payload: SignupPayload): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/signup`, payload, {
      responseType: 'text',
    });
  }

  signin(payload: SigninPayload): Observable<boolean> {
    return this.httpClient
      .post<SigninResponsePayload>(`${this.apiUrl}/signin`, payload)
      .pipe(
        map((res) => {
          this.localStorage.store(
            'authenticationToken',
            res.authenticationToken
          );
          this.localStorage.store('refreshToken', res.refreshToken);
          this.localStorage.store('expiresAt', res.expiresAt);
          this.localStorage.store('username', res.username);
          return true;
        })
      );
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.refreshToken,
      username: this.getUsername(),
    };

    return this.httpClient
      .post<SigninResponsePayload>(
        `${this.apiUrl}/refresh`,
        refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorage.store(
            'authenticationToken',
            response['authenticationToken']
          );
          this.localStorage.store('expiresAt', response['expiresAt']);
        })
      );
  }
}
