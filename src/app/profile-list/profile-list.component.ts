import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ProfileListService } from './profile-list.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ModifyProfComponent } from '../modify-prof/modify-prof.component';
import { ModifyProfImgComponent } from '../modify-prof-img/modify-prof-img.component';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  constructor(
    private profileListService: ProfileListService,
    private router: Router,
    private cookieService: CookieService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  signout() {
    this.profileListService.trySignOut().subscribe(response => {
      this.cookieService.deleteAll();
      this.router.navigate(['/']);
      location.reload();
    });
  }

  modifyProf() {
    const dialogRef = this.dialog.open(ModifyProfComponent, {
      'width': '350px',
      'height': '500px',
      'data': {}
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
