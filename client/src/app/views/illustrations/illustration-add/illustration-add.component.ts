import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectsService} from "../../../services/projects.service";
import {IllustrationService} from "../../../services/illustration.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {throwError} from "rxjs";

@Component({
  selector: 'app-illustration-add',
  templateUrl: './illustration-add.component.html',
  styleUrls: ['./illustration-add.component.css']
})
export class IllustrationAddComponent implements OnInit {

  projectName ='';
  form: FormGroup = new FormGroup({
    File: new FormControl('',[Validators.required]),
    IllustrationName: new FormControl('',[Validators.required]),
    IllustrationType: new FormControl('',[Validators.required]),
    Tags: new FormControl('', [])
  });

  constructor(private illustrationService: IllustrationService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.projectName = params['projectName'];
          console.log(this.projectName)
        })
  }


  selectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      this.form.patchValue({
        File: file
      });
    }
  }

  uploadIllustration() {

    const formData: FormData = new FormData()

    formData.append('File', this.form.value.File);
    formData.append('IllustrationName',this.form.value.IllustrationName)
    formData.append('IllustrationType',this.form.value.IllustrationType)
    formData.append('Tags', this.form.value.Tags)
    this.illustrationService.createIllustration(this.projectName,formData)
      .subscribe(response => {
        console.log(response)
      }, error => {
        throwError(error)
      });

  }
}
