import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient,
  ) { }

  trySignin(data): Observable<Object> {
    const url = '/api/signin';
    const body = {
      mailAddress: data.mailAddress,
      password: data.password
    };

    return this.http.post(url, body);
  }
}
