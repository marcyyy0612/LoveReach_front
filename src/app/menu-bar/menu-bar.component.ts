import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SigninComponent } from '../authorization/signin/signin.component';
import { SignupComponent } from '../authorization/signup/signup.component';
import { AuthorizationComponent } from '../authorization/authorization.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  constructor(public matDialog: MatDialog) {}

  openAuthorizeWindow(): void {

    const dialog = this.matDialog.open(AuthorizationComponent, {
      'data' : {'title': 'Authorization'},
      'height' : '500px',
      'width' : '350px',
      'disableClose' : false
    });
    dialog.afterClosed();
  }
}
