import { SignupPayload } from './../signup/signup.payload';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {}

  signup(payload: SignupPayload): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/signup`, payload, {
      responseType: 'text',
    });
  }
}
