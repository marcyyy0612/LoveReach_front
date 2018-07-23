import { Component, OnInit } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { Router } from '@angular/router';
import { RecsService } from './recs.service';

@Component({
  selector: 'app-recs',
  templateUrl: './recs.component.html',
  styleUrls: ['./recs.component.css']
})
export class RecsComponent implements OnInit {

  private mode: string;
  private showFlg: boolean;
  private selectedUser: Object;
  private myInfo;
  private myAvatar: string;
  constructor( private recsService: RecsService,
    private router: Router) { }

  ngOnInit() {
    this.mode = 'stores';
    this.setMyInfo();
  }

  onBackButton() {
    this.mode = 'stores';
    this.showFlg = false;
  }
  onProfileButton() {
    this.mode = 'profile';
    this.showFlg = true;
  }
  messageToSelectedUser(user: Object) {
    this.mode = 'messages';
    this.selectedUser = user;
  }
  toStoreFromMessages() {
    this.mode = 'stores';
    this.showFlg = false;
  }
  setMyInfo() {
    this.recsService.getMyInfo().subscribe(response => {
      this.myInfo = response['Me'][0];
      this.myAvatar = this.recsService.getUsersImgPath(this.myInfo['PROFILE_IMAGE']);
    });
  }
}
