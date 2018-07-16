import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface MatchUserObj {
  userId: number;
  userName: string;
  sex: number;
  profile: string;
}

interface MatchUsers {
  matchUsers: Array<MatchUserObj>;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesListService {

  constructor(private http: HttpClient) { }

  fetchMatchUsers(): Observable<MatchUsers> {
    const url = '/api/users/like';
    return this.http.get<MatchUsers>(url);
  }
}
