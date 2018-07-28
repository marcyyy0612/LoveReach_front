import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

interface MatchUserObj {
  userId: number;
  userName: string;
  sex: number;
  profile: string;
  image: string;
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

  fetchMatchUsersImg(imgName: string): string {
    AWS.config.update({
      accessKeyId: environment.S3_ACCESS_KEY,
      secretAccessKey: environment.S3_SECRET_KEY,
      region: environment.S3_REGION
    });
    const s3 = new S3();
    const params = {
      Bucket: environment.S3_BUCKET_NAME,
      Key: imgName,
      Expires: 60
    };

    return s3.getSignedUrl('getObject', params);
  }
}
