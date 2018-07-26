import { Component, OnInit, Inject } from '@angular/core';
import { AppState } from '../app.state';
import { UUID } from 'angular2-uuid';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ModifyProfImgService } from './modify-prof-img.service';

export interface DialogData {
  profileImage: string;
}

@Component({
  selector: 'app-modify-prof-img',
  templateUrl: './modify-prof-img.component.html',
  styleUrls: ['./modify-prof-img.component.css']
})
export class ModifyProfImgComponent implements OnInit {
  private selectedFiles: FileList;
  private isFaildModify = false;
  private isSelectedFile = false;
  private appState = new AppState();

  constructor(
    public dialogRef: MatDialogRef<ModifyProfImgComponent>,
    private modifyProfImgService: ModifyProfImgService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onOkClick() {
    const file = this.selectedFiles.item(0);
    const fileName =  UUID.UUID() + file.name;
    this.appState.loadStart();
    this.modifyProfImgService.modifyProfImg(fileName).subscribe(response => {
      this.modifyProfImgService.uploadFile(file, fileName).subscribe(res => {
        this.dialogRef.close();
        this.appState.loadEnd();
        location.reload();
      });
    }, error => {
      this.isFaildModify = true;
      this.appState.loadEnd();
    });
  }

  selectedFile(event): void {
    this.selectedFiles = event.target.files;
    this.isSelectedFile = true;
  }

}
