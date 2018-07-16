import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AuthorizationComponent>) { }
  private signupMode: boolean;

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toSignup() {
    this.signupMode = true;
  }

  toSignin() {
    this.signupMode = false;
  }
}
