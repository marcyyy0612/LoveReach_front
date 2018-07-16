import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.Service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private myProfileImg: string;
  private user;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.setMyInfo();
  }

  setMyInfo() {
    const imgName = 'user1.jpg';
    this.profileService.fetchMyInfo().subscribe ( response => {
      this.user = response['Me'][0];
        console.log(this.user['PROFILE_IMAGE']);
      this.myProfileImg = this.profileService.getMyProfileImg(imgName);
    });
  }

}
