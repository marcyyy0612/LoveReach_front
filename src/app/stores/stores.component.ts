import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StoresService } from './stores.service';
import { Router } from '@angular/router';
import 'hammerjs';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  private users;
  private userId: number;
  private userName: string;
  private imgPath: string;
  private selectedCount = 0;
  private profile: string;
  private imgPaths: Array<string> = new Array();
  @Output() setMyAvatarEvent = new EventEmitter();

  constructor(private storesService: StoresService,
    private router: Router) { }

  ngOnInit() {
    this.setStoresUser();
  }

  setStoresUser() {
    this.storesService.getStoresUser().subscribe(response => {
      this.getCurrentLocation();
      if (response['result'] !== 'failure') {
        this.users = response;
        this.userId = this.users['USERS'][0]['USER_ID'];
        this.imgPath = this.getUsersImage(this.users['USERS'][0]['PROFILE_IMAGE']);
        this.userName = this.users['USERS'][0]['USER_NAME'];
        this.profile = this.users['USERS'][0]['PROFILE'];
      }
    }, error => {
      this.router.navigate(['/']);
    });
  }

  getCurrentLocation(): Map<string, number> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        return new Map([['latitude', position.coords.latitude], ['longitude', position.coords.longitude]]);
      });
    } else {
      return new Map([['latitude', 0], ['longitude', 0]]);
    }
  }

  getUsersImage(imgName: string): string {
    return this.storesService.getUsersImgPath(imgName);
  }

  selectMatching(status: number) {
    this.storesService.insertMatchingStatus(this.userId, status);
    this.selectedCount++;
    this.userId = this.users['USERS'][this.selectedCount]['USER_ID'];
    this.imgPath = this.getUsersImage(this.users['USERS'][this.selectedCount]['PROFILE_IMAGE']);
    this.userName = this.users['USERS'][this.selectedCount]['USER_NAME'];
    this.profile = this.users['USERS'][this.selectedCount]['PROFILE'];
  }

  swipe(action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.LEFT) {
      this.selectMatching(0);
    }
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.selectMatching(1);
    }
  }
}
