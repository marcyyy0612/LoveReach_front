import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteAccountService {

  constructor(
    private http: HttpClient
  ) { }

  tryDeleteAccount() {
    const url = '/api/users/delete';
    return this.http.get(url);
  }
}
