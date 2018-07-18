import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';

interface UserObj {
  userId: number;
  userName: string;
  sex: number;
  birthday: string;
  profile: string;
  imgPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  getMessages(partnerId: number): Observable<Object> {
    const url = '/api/users/messages/' + partnerId;
    return this.http.get(url);
  }

  sendMessages(sendMessage: string, partnerId: number): Observable<Object> {
    const url = 'api/users/insertMessages';
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const message = {
      userId: 0,
      partnerId: partnerId,
      message: sendMessage,
      sendDatetime: now
    };

    console.log(message);
    return this.http.post(url, message);
  }

  getMyInfo(): Observable<UserObj> {
    const url = '/api/users/me';
    return this.http.get<UserObj>(url);
  }
}
