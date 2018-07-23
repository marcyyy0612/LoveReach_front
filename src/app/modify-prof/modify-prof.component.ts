import { Component, Inject, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ModifyProfService } from './modify-prof.service';

export interface DialogData {
  userName: string;
  sex: string;
  birthday: string;
  profile: string;
  mailAddress: string;
  password: string;
}
@Component({
  selector: 'app-modify-prof',
  templateUrl: './modify-prof.component.html',
  styleUrls: ['./modify-prof.component.css']
})
export class ModifyProfComponent implements OnInit {
  userName = 'hoge';

  public passwordMaxLength = 15;
  public passwordMinLength = 8;
  public addressMaxLength = 30;
  public addressMinLength = 10;
  constructor(
    public dialogRef: MatDialogRef<ModifyProfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onOkClick() {

  }

}
