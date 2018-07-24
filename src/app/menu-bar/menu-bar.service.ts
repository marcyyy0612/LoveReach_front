import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuBarService {

  constructor(
    private http: HttpClient
  ) { }

  isAlreadySignin() {
    const url = '/api/isAlreadySignin';
    return this.http.get(url);
  }
}
