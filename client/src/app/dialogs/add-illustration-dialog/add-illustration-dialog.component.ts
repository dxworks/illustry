import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { throwError } from "rxjs";
import { IllustrationService } from "../../services/illustration.service";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

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
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = []

  allIllustrationTypes = [
    { value: 'force-directed-graph', viewValue: 'Force-Layout-Graph' },
    { value: 'chart', viewValue: 'Echarts' },
    { value: 'word-cloud', viewValue: 'Wordcloud' },
    { value: 'plotly', viewValue: 'Plotly' },
    { value: 'timeline', viewValue: 'Timeline' },
    { value: 'treemap', viewValue: 'Treemap ' },
    { value: 'sankey', viewValue: 'Sankey' },
    { value: 'calendar', viewValue: 'Calendar' },
    { value: 'matrix', viewValue: 'Matrix' },
    { value: 'graphviz', viewValue: 'Graphviz' },
    { value: 'hierarchical-edge-bundling', viewValue: 'Hierarchical-Edge-Bundling' }
  ]
  form: FormGroup = new FormGroup({
    File: new FormControl('', [Validators.required]),
    SelectedFormat: new FormControl('JSON', [Validators.required]),
    Separator: new FormControl(',', []),
    IllustrationName: new FormControl('', []),
    IllustrationDescription: new FormControl('', []),
    IllustrationType: new FormControl(this.allIllustrationTypes[0], [Validators.required]),
  });
  files: File[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { projectName: string }, private illustrationService: IllustrationService, private router: Router) { }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
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
      formData.append('tags', this.tags.toString())
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

