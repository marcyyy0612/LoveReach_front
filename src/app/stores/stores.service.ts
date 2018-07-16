import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import * as moment from 'moment';

interface UserObj {
  userId: number;
  userName: string;
  sex: number;
  birthday: string;
  profile: string;
  imgPath: string;
}

interface Users {
  users: Array<UserObj>;
}

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  constructor(private http: HttpClient) { }

  insertMatchingStatus(partnerId: number, status: number): boolean {
    let matchingResult: boolean;
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const url = '/api/users/matching';
    const body = {
      userId: 1, // API側でログインを判定しているのでなんでもおｋ
      partnerId: partnerId,
      matchState: status,
      selectedDatetime: nowTime
    };

    this.http.post(url, body)
      .subscribe(response => {
        switch (response['result']) {
          case 'success':
            matchingResult = true;
            break;
          case 'failure':
            matchingResult = false;
            break;
        }
      },
        error => {
          console.log('error');
        }
      );
    return matchingResult;
  }

  getStoresUser(): Observable<Users> {
    const url = '/api/users/list';
    return this.http.get<Users>(url);
  }

  getUsersImgPath(imgName: string): string {
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
