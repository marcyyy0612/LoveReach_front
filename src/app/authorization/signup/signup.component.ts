import { Component, Inject, Output, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SignupService } from './signup.service';
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
    const file = this.selectedFiles.item(0);
    this.signupService.trySignup(data, file.name).subscribe(response => {
      this.upload(file);
      this.dialogRef.close();
      this.router.navigate(['/app/recs']);
    },
      error => {
        console.log('error');
      }
    );
  }

  upload(file): void {
    this.signupService.uploadFile(file);
  }

  selectedFile(event): void {
    this.selectedFiles = event.target.files;
  }

  onSigninButton(): void {
    this.toSignin.emit();
  }
}
