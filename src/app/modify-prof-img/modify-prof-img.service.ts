import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { environment } from '../../environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class ModifyProfImgService {

  constructor(
    private http: HttpClient
  ) { }

  modifyProfImg(fileName) {
    const url = '/api/users/updateImg';
    const body = {
      profileImage: fileName
    };
    return this.http.post(url, body);
  }

  uploadFile(file, fileName) {
    AWS.config.update({
      accessKeyId: environment.S3_ACCESS_KEY,
      secretAccessKey: environment.S3_SECRET_KEY,
      region: environment.S3_REGION
    });
    const s3 = new S3();

    const params = {
      Bucket: environment.S3_BUCKET_NAME,
      Key: fileName,
      Body: file
    };
    return from(s3.putObject(params).promise());
  }
}
