import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProjectsService} from "../../services/projects.service";
import {Params, Route, Router} from "@angular/router";
import {IllustrationService} from "../../services/illustration.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {throwError} from "rxjs";

@Component({
  selector: 'app-update-illustration-dialog',
  templateUrl: './update-illustration-dialog.component.html',
  styleUrls: ['./update-illustration-dialog.component.css']
})
export class UpdateIllustrationDialogComponent implements OnInit {

  form: FormGroup = new FormGroup({
    File: new FormControl('',[Validators.required]),
    IllustrationName: new FormControl('',[Validators.required]),
    IllustrationType: new FormControl(''),
    Tags: new FormControl('')
  });
  files: File[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {illustrationName: string, projectName: string}, private illustrationService:IllustrationService, private router: Router) { }

  ngOnInit(): void {
  }
  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    const file = this.files[0];
    this.form.patchValue({
      File: file
    });
  }
  updateIllustration() {

    const formData: FormData = new FormData()

    formData.append('File', this.form.value.File);
    formData.append('IllustrationName',this.form.value.IllustrationName);
    formData.append('IllustrationType', this.form.value.IllustrationType);
    formData.append('Tags',this.form.value.Tags);
    this.illustrationService.updateIllustration(this.data.projectName,this.data.illustrationName,formData)
      .subscribe(response => {
        console.log(response)
      }, error => {
        throwError(error)
      });

  }


  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  back() {
    this.router.navigate([".."]);
  }
}
