import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private myInfo;
  private myProfileImg: string;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.setMyInfo();
  }

  setMyInfo() {
    const imgName = 'user1.jpg';
    this.profileService.getMyInfo().subscribe ( response => {
      this.myInfo = response['Me'][0];
      // this.myProfileImg = this.profileService.getMyProfileImg(imgName);
      this.myProfileImg = './assets/images/sample1.jpg';
    });
  }

}
