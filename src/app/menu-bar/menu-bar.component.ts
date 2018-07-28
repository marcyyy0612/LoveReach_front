import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { SigninComponent } from '../authorization/signin/signin.component';
import { SignupComponent } from '../authorization/signup/signup.component';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { MenuBarService } from './menu-bar.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  private isOnClickButton = false;
  private appState = new AppState();

  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private menubarService: MenuBarService
  ) {}

  onAuthorizeButton(): void {
    if (this.isOnClickButton === false) {
      this.appState.loadStart();
      this.isOnClickButton = true;
      this.menubarService.isAlreadySignin().subscribe(response => {
        this.appState.loadEnd();
        this.router.navigate(['/app/recs']);
      },
        error => {
          this.appState.loadEnd();
          this.openAuthorizeWindow();
        });
    }
  }

  openAuthorizeWindow(): void {
    this.isOnClickButton = false;
    const dialog = this.matDialog.open(AuthorizationComponent, {
      'data' : {'title': 'Authorization'},
      'height' : '500px',
      'width' : '350px',
      'disableClose' : false,
    });
    dialog.afterClosed();
  }
}
