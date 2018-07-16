import { Component, OnInit } from '@angular/core';
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-recs',
  templateUrl: './recs.component.html',
  styleUrls: ['./recs.component.css']
})
export class RecsComponent implements OnInit {

  private mode: string;
  private showFlg: boolean;
  private selectedUser: Object;
  constructor() { }

  ngOnInit() {
    this.mode = 'stores';
  }

  onPartnersButton() {
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
}
