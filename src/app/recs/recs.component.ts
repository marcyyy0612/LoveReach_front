import { Component, OnInit } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recs',
  templateUrl: './recs.component.html',
  styleUrls: ['./recs.component.css']
})
export class RecsComponent implements OnInit {

  private mode: string;
  private showFlg: boolean;
  private selectedUser: Object;
  constructor( private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    // console.log(this.cookieService.getAll());
    if (!this.cookieService.check('PLAY_SESSION_CSRF')) {
      this.router.navigate(['/']);
    }
    this.mode = 'stores';
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
}
