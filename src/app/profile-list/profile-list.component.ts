import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ProfileListService } from './profile-list.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppState } from '../app.state';
import { ModifyProfComponent } from '../modify-prof/modify-prof.component';
import { ModifyProfImgComponent } from '../modify-prof-img/modify-prof-img.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  private appState = new AppState();
  @Input() myInfo;

  constructor(
    private profileListService: ProfileListService,
    private router: Router,
    private cookieService: CookieService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  signout() {
    this.appState.loadStart();
    this.profileListService.trySignOut().subscribe(response => {
      this.appState.loadEnd();
      this.cookieService.deleteAll();
      this.router.navigate(['/']);
      location.reload();
    });
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(DeleteAccountComponent, {
      'width': '350px',
      'height': '500px',
      'data': {}
    });
  }

  modifyProf() {
    const dialogRef = this.dialog.open(ModifyProfComponent, {
      'width': '350px',
      'height': '500px',
      'data': {
        userName:  this.myInfo['USER_NAME'],
        profile: this.myInfo['PROFILE'],
        sex: this.myInfo['SEX']
      }
    });
    dialogRef.afterClosed();
  }

  modifyProfImg() {
    const dialogRef = this.dialog.open(ModifyProfImgComponent, {
      'width': '350px',
      'height': '500px',
      'data': {}
    });
    dialogRef.afterClosed();
  }
}
