import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

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
export class RecsService {

  constructor(private http: HttpClient) { }

  getMyInfo(): Observable<UserObj> {
    const url = '/api/users/me';
    return this.http.get<UserObj>(url);
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

  insertLocation(): void {
    const url = '/api/location';

    var geoSuccess = function(position) {
      const body = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.post(url, body).subscribe(response => {});
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess.bind(this.http));
    }
  }
}
