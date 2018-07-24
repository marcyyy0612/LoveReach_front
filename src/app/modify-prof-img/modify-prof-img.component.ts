import { Component, OnInit, Inject } from '@angular/core';
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
    this.modifyProfImgService.modifyProfImg(fileName).subscribe(response => {
    this.upload(file, fileName);
      this.dialogRef.close();
    }, error => {
      this.isFaildModify = true;
    });
  }

  selectedFile(event): void {
    this.selectedFiles = event.target.files;
  }
  upload(file, fileName): void {
    this.modifyProfImgService.uploadFile(file, fileName);
  }

}
