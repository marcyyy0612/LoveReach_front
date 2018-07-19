import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StoresService } from './stores.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import 'hammerjs';
import { MatchingComponent } from '../matching/matching.component';

export interface DialogData {
  me: string;
  partner: string;
  myProfImg: string;
  partnerImg: string;
}

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
  private like: boolean;
  private nope: boolean;
  private myName: string;
  private myProfImg: string;
  @Output() setMyAvatarEvent = new EventEmitter();

  constructor(private storesService: StoresService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.setStoresUser();
  }

  setStoresUser() {
    this.storesService.getStoresUser().subscribe(response => {
      this.getCurrentLocation();
      this.users = response;
      this.userId = this.users['USERS'][0]['USER_ID'];
      this.imgPath = this.getUsersImage(this.users['USERS'][0]['PROFILE_IMAGE']);
      this.userName = this.users['USERS'][0]['USER_NAME'];
      this.profile = this.users['USERS'][0]['PROFILE'];
    }, error => {
      this.router.navigate(['/']);
    });
  }

  setMyInfo() {
    this.storesService.getMyInfo().subscribe(response => {
      this.myName = response['Me'][0]['USER_NAME'];
      this.myProfImg = this.getUsersImage(response['Me'][0]['PROFILE_IMAGE']);
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
    this.showSelectMark(status);
    setTimeout(() => {
      this.like = false;
      this.nope = false;
    }, 600);
    this.storesService.insertMatchingStatus(this.userId, status)
      .subscribe(response => {
        if (response['isMatching'] === true) {
          const partnerName = this.userName;
          const partnerImg = this.imgPath;
          this.openMatchingDialog(partnerName, partnerImg);
          this.selectedCount++;
          this.setNextUser();
        } else {
          this.selectedCount++;
          this.setNextUser();
        }
      });
  }

  setNextUser() {
    this.userId = this.users['USERS'][this.selectedCount]['USER_ID'];
    this.imgPath = this.getUsersImage(this.users['USERS'][this.selectedCount]['PROFILE_IMAGE']);
    this.userName = this.users['USERS'][this.selectedCount]['USER_NAME'];
    this.profile = this.users['USERS'][this.selectedCount]['PROFILE'];
  }

  showSelectMark(status: number) {
    if (status === 0) {
      this.nope = true;
    } else {
      this.like = true;
    }
  }

  swipe(action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.LEFT) {
      this.selectMatching(0);
    }
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.selectMatching(1);
    }
  }
  openMatchingDialog(partnerName: string, partnerImg: string): void {
    const dialogRef = this.dialog.open(MatchingComponent, {
      'width': '400px',
      'height': '400px',
      'data': {'me': this.myName, 'partner': partnerName
        , 'myProfImg': this.myProfImg, 'partnerImg': partnerImg}
    });
    dialogRef.afterClosed();
  }
}
