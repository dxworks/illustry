import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../../services/projects.service";
import { Project } from "../../../../types/projects.model";
import { throwError } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Illustration } from "../../../../types/illustration.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { AddProjectDialogComponent } from "../../../dialogs/add-project-dialog/add-project-dialog.component";
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
    IllustrationType: '',
    Tags: ''
  };

  submitted: boolean = false;
  files: File[] = [];


  form: FormGroup = new FormGroup({
    ProjectName: new FormControl('', [Validators.required]),
    ProjectDescription: new FormControl('', []),
    File: new FormControl('', [Validators.required]),
    IllustrationName: new FormControl('', [Validators.required]),
    IllustrationType: new FormControl('', [Validators.required]),
    Tags: new FormControl('', [])
  });

  constructor(private projectService: ProjectsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialogForAddingProjects() {
    this.dialog.open(AddProjectDialogComponent, {
      maxWidth: "500px",
      minWidth: "400px",
      maxHeight: "200px",
      minHeight: "150px"
    });
  }



  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    const file = this.files[0];
    this.form.patchValue({
      File: file
    });
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  uploadProject() {
    this.openDialogForAddingProjects()
    const formData: FormData = new FormData()

    formData.append('ProjectName', this.form.value.ProjectName);
    formData.append("ProjectDescription", this.form.value.ProjectDescription);
    formData.append('File', this.form.value.File);
    formData.append('IllustrationName', this.form.value.IllustrationName);
    formData.append('IllustrationType', this.form.value.IllustrationType);
    formData.append('Tags', this.form.value.Tags)
    this.projectService.createProject(formData)
      .subscribe(response => {
        this.submitted = true;
        this.clearForm()
      }, error => {
        throwError(error)
      });

  }

  clearForm() {
    (<HTMLFormElement>document.getElementById("addProjectForm")).reset();
  }

}
