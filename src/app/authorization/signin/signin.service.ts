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
    // const url = 'http://elb-marcy-979779113.ap-northeast-1.elb.amazonaws.com/api/signin';
    const url = '/api/signin';
    const body = {
      mailAddress: data.mailAddress,
      password: data.password
    };

    return this.http.post(url, body);
  }
}
