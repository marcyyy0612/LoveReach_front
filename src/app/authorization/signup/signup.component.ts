import { Component, Inject, Output, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

export interface DialogData {
  userName: string;
  sex: number;
  birthday: string;
  profile: string;
  mailAddress: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  selectedFiles: FileList;
  constructor(public dialogRef: MatDialogRef<SignupComponent>,
    private signupService: SignupService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  @Output() toSignin = new EventEmitter();

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(data): void {
    console.log(data);
    // this.signupService.trySignup(data).subscribe(response => {
    //   this.upload();
    //   this.dialogRef.close();
    //   this.router.navigate(['/app/recs']);
    // },
    //   error => {
    //     console.log('error');
    //   }
    // );
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.signupService.uploadFile(file);
  }

  selectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSigninButton(): void {
    this.toSignin.emit();
  }
}
