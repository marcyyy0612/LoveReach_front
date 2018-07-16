import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  trySignup(data): Observable<Object> {
    const today = moment().format('YYYY-MM-DD');
    const url = '/api/signup';
    const body = {
      userId: 0, // userIdはAPI側でオートインクリメントしているのでなんでもおｋ
      userName: data.userName,
      sex: 1,
      birthday: data.birthday,
      profile: data.profile,
      createdAt: today,
      mailAddress: data.mailAddress,
      password: data.password,
      profileImage: 'user1.jpg'
    };
    return this.http.post(url, body);
  }

  uploadFile(file) {
    AWS.config.update({
      accessKeyId: environment.S3_ACCESS_KEY,
      secretAccessKey: environment.S3_SECRET_KEY,
      region: environment.S3_REGION
    });
    const s3 = new S3();

    const params = {
      Bucket: 'final-training2018-marcy',
      Key: file.name,
      Body: file
    };
    s3.putObject(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }
}
