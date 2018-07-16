import { Component, Inject, Output, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SigninService } from './signin.service';

export interface DialogData {
  mailAddress: string;
  password: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(public dialogRef: MatDialogRef<SigninComponent>,
    private signinService: SigninService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  @Output() toSignup = new EventEmitter();

  onOkClick(data): void {
    this.signinService.trySignin(data).subscribe(response => {
      this.dialogRef.close();
      this.router.navigate(['/app/recs']);
    },
      error => {
        console.log('error');
      }
    );
  }

  onSignupButton(): void {
    this.toSignup.emit();
  }
}
