import { Component, OnInit , Inject} from '@angular/core';
import { StoresComponent } from '../stores/stores.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  me: string;
  partner: string;
  myProfImg: string;
  partnerImg: string;
}

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent {

  constructor(public dialogRef: MatDialogRef<MatchingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNextButton(): void {
    this.dialogRef.close();
    location.reload();
  }
}
