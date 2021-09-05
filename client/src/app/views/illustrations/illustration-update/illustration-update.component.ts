import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {IllustrationService} from "../../../services/illustration.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-illustration-update',
  templateUrl: './illustration-update.component.html',
  styleUrls: ['./illustration-update.component.css']
})
export class IllustrationUpdateComponent implements OnInit {
  projectName = '';
  illustrationName = '';
  form: FormGroup = new FormGroup({
    File: new FormControl('',[Validators.required]),
    IllustrationName: new FormControl('',[Validators.required]),
    IllustrationType: new FormControl(''),
    Tags: new FormControl('')
  });

  constructor(private illustrationService: IllustrationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.projectName = this.route.parent.snapshot.paramMap.get('projectName');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.illustrationName = params['illustrationName'];
        }
      );
  }

  selectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.form.patchValue({
        File: file
      });
    }
  }

  updateIllustration() {

    const formData: FormData = new FormData()

    formData.append('File', this.form.value.File);
    formData.append('IllustrationName',this.form.value.IllustrationName);
    formData.append('IllustrationType', this.form.value.IllustrationType);
    formData.append('Tags',this.form.value.Tags);
    this.illustrationService.updateIllustration(this.projectName,this.illustrationName,formData)
      .subscribe(response => {
        console.log(response)
      }, error => {
        throwError(error)
      });

  }
}
