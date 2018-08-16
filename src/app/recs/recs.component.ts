import { Component, OnInit, NgZone, Input } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { Router } from '@angular/router';
import { RecsService } from './recs.service';
import { MatSidenav } from '@angular/material';

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
  private sidenavOpened = true;
  private sidenavMode = 'side';
  private windowSize: number;

  constructor(
    private recsService: RecsService,
    private router: Router,
    private ngZone: NgZone
  ) {
    window.onresize = (e) => {
      ngZone.run(() => {
        this.handleResizeWindow(window.innerWidth);
      });
    };
  }

  ngOnInit() {
    this.handleResizeWindow(window.innerWidth);
    this.mode = 'stores';
    this.setMyInfo();
    this.recsService.insertLocation();
  }

  private handleResizeWindow(width: number) {
    this.windowSize = width;
    if (800 < width) {
      this.sidenavOpened = true;
      this.sidenavMode = 'side';
    } else {
      this.sidenavOpened = false;
      this.sidenavMode = 'over';
    }
  }
  toggleSidenav(event) {
    if (this.sidenavOpened === true) {
      this.sidenavMode = 'over';
      this.sidenavOpened = false;
    } else {
      this.sidenavMode = 'over';
      this.sidenavOpened = true;
    }
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
    if (this.windowSize < 800) {
      this.sidenavMode = 'over';
      this.sidenavOpened = false;
    }
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
