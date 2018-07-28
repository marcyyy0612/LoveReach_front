import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModifyProfService {

  constructor(
    private http: HttpClient
  ) { }

  modifyProf(data) {
    const url = '/api/users/update';
    const body = {
      userName: data.userName,
      sex: Number(data.sex),
      profile: data.profile,
    };
    return this.http.post(url, body);
  }
}
