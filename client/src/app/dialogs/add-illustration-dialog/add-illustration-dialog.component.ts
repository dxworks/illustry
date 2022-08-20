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
  selectedFileFormats: string[] = ['CSV', 'JSON', 'XML']
  selectedFileFormat: string = this.selectedFileFormats[1];
  selectedSeparators: string[] = [',', ';', '|']
  selectedSeparator: string = this.selectedSeparators[0];
  form: FormGroup = new FormGroup({
    File: new FormControl('', [Validators.required]),
    SelectedFormat: new FormControl('JSON', [Validators.required]),
    Separator: new FormControl(',', []),
    IllustrationName: new FormControl('', []),
    IllustrationDescription: new FormControl('', []),
    IllustrationType: new FormControl('force-directed-graph', []),
    Tags: new FormControl('', []),
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
    if (this.form.value.SelectedFormat === 'CSV') {
      formData.append('format', this.form.value.SelectedFormat);
      formData.append('separator', this.form.value.Separator);
      formData.append('illustrationName', this.form.value.IllustrationName)
      formData.append('illustrationDescription', this.form.value.IllustrationDescription)
      console.log(this.form.value.IllustrationType)
      formData.append('illustrationType', this.form.value.IllustrationType)
      formData.append('tags', this.form.value.Tags)
      if (this.form.value.File) {
        this.form.value.File.forEach((file: string | Blob) => {
          formData.append('File', file);
        })
      }
    }
    else {
      if (this.form.value.File) {
        formData.append('format', this.form.value.SelectedFormat);
        this.form.value.File.forEach((file: string | Blob) => {
          formData.append('File', file);
        })
      }
    }


    this.illustrationService.createIllustration(this.data.projectName, formData)
      .subscribe(response => {
      }, error => {
        throwError(error)
      });

  }
}

