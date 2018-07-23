import { Component, Inject, Output, EventEmitter} from '@angular/core';
import { UUID } from 'angular2-uuid';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SignupService } from './signup.service';
import { SigninService } from '../signin/signin.service';
import { Router } from '@angular/router';

export interface DialogData {
  userName: string;
  sex: string;
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

  private selectedFiles: FileList;
  public passwordMaxLength = 15;
  public passwordMinLength = 8;
  public addressMaxLength = 30;
  public addressMinLength = 10;
  private isFaildSignup = false;

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private signupService: SignupService,
    private signinService: SigninService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  @Output() toSignin = new EventEmitter();

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(data): void {
    const file = this.selectedFiles.item(0);
    const fileName =  UUID.UUID() + file.name;
    this.signupService.trySignup(data, fileName).subscribe(response => {
      this.upload(file, fileName);
      this.dialogRef.close();
      this.signupService.trySignin(data).subscribe(res => {
        this.router.navigate(['/app/recs']);
      });
    },
      error => {
        this.isFaildSignup = true;
        console.log('error');
      });
  }

  upload(file, fileName): void {
    this.signupService.uploadFile(file, fileName);
  }

  selectedFile(event): void {
    this.selectedFiles = event.target.files;
  }

  onSigninButton(): void {
    this.toSignin.emit();
  }
}
