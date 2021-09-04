import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProjectsService} from "../../../services/projects.service";
import {Project} from "../../../../types/projects.model";
import {throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Illustration} from "../../../../types/illustration.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
  providers: [ProjectsService]
})
export class ProjectAddComponent implements OnInit {
  project: Project = {
    _id: '',
    ProjectName: '',
    ProjectDescription: ''
  };
  illustration: Illustration = {
    _id: '',
    IllustrationName: '',
    IllustrationData: [],
    IllustrationType: ''
  };

  submitted: boolean = false;
  file: File = <File>{};

  form: FormGroup = new FormGroup({
    ProjectName: new FormControl('',[Validators.required]),
    ProjectDescription:new FormControl('',[Validators.required]),
    File: new FormControl('',[Validators.required]),
    IllustrationName: new FormControl('',[Validators.required]),
    IllustrationType: new FormControl('',[Validators.required]),
  });

  constructor(private projectService: ProjectsService) {
  }

  ngOnInit(): void {
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

  uploadProject() {

    const formData: FormData = new FormData()

    formData.append('ProjectName', this.form.value.ProjectName);
    formData.append("ProjectDescription" ,this.form.value.ProjectDescription);
    formData.append('File', this.form.value.File);
    formData.append('IllustrationName',this.form.value.IllustrationName);
    formData.append('IllustrationType',this.form.value.IllustrationType)
    console.log(formData)
    this.projectService.createProject(formData)
      .subscribe(response => {
        console.log(response)
        this.submitted = true;
      }, error => {
        throwError(error)
      });

  }

  // newProject() {
  //   this.project = {
  //     _id: '',
  //     ProjectName: '',
  //     ProjectDescription: ''
  //   };
  //   this.submitted = false;
  //   this.illustration = {
  //     _id: '',
  //     IllustrationName: '',
  //     IllustrationData: []
  //   };
  //   this.file = <File>{};
  // }
}
