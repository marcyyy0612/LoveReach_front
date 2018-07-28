import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileListService {

  constructor(private http: HttpClient) { }

  trySignOut() {
    const url = '/api/signout';
    return this.http.get(url);
  }
}
