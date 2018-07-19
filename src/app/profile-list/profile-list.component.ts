import { Component, OnInit } from '@angular/core';
import { ProfileListService } from './profile-list.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  constructor(private profileListService: ProfileListService,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
  }

  signout() {
    this.profileListService.trySignOut().subscribe(response => {
      this.cookieService.deleteAll();
      this.router.navigate(['/']);
      location.reload();
    });
  }

}
