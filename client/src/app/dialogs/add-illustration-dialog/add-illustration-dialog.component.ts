import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { throwError } from "rxjs";
import { IllustrationService } from "../../services/illustration.service";

@Component({
  selector: 'app-add-illustration-dialog',
  templateUrl: './add-illustration-dialog.component.html',
  styleUrls: ['./add-illustration-dialog.component.css']
})
export class AddIllustrationDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    File: new FormControl('', [Validators.required]),
    // IllustrationName: new FormControl('', [Validators.required]),
    // IllustrationType: new FormControl('', [Validators.required]),
    // Tags: new FormControl('', [])
  });
  files: File[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { projectName: string }, private illustrationService: IllustrationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    const file = this.files;
    this.form.patchValue({
      File: file
    });
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  uploadIllustration() {

    const formData: FormData = new FormData()
    this.form.value.File.forEach((file: string | Blob) => {
      formData.append('File', file);
    })
    // formData.append('IllustrationName', this.form.value.IllustrationName)
    // formData.append('IllustrationType', this.form.value.IllustrationType)
    // formData.append('Tags', this.form.value.Tags)
    this.illustrationService.createIllustration(this.data.projectName, formData)
      .subscribe(response => {
      }, error => {
        throwError(error)
      });

  }
}

