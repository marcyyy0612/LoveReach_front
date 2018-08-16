import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  name: string;
  img: string;
}

@Component({
  selector: 'app-partner-info',
  templateUrl: './partner-info.component.html',
  styleUrls: ['./partner-info.component.css']
})
export class PartnerInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {}

}
