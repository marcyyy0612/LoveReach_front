import { Component, Inject, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ModifyProfService } from './modify-prof.service';

export interface DialogData {
  userName: string;
  sex: number;
  profile: string;
  profileImage: string;
}
@Component({
  selector: 'app-modify-prof',
  templateUrl: './modify-prof.component.html',
  styleUrls: ['./modify-prof.component.css']
})
export class ModifyProfComponent implements OnInit {
  private isFaildModify = false;
  constructor(
    public dialogRef: MatDialogRef<ModifyProfComponent>,
    private modifyProfService: ModifyProfService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onOkClick() {
    this.modifyProfService.modifyProf(this.data).subscribe(response => {
      this.dialogRef.close();
      location.reload();
    }, error => {
        this.isFaildModify = true;
    });
  }

}
