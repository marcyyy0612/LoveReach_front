import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DeleteAccountService } from './delete-account.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountComponent>,
    private deleteAccountService: DeleteAccountService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
  }

  onOkClick() {
    this.deleteAccountService.tryDeleteAccount().subscribe(response => {
      this.cookieService.deleteAll();
      this.router.navigate(['/']);
      location.reload();
      this.dialogRef.close();
    }, error => {

    });
  }
}
