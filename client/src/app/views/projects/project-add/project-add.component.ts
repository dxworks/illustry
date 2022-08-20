/// <reference types= '@dxworks/illustrytypes' />
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../../services/projects.service";
import { throwError } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AddProjectDialogComponent } from "../../../dialogs/add-project-dialog/add-project-dialog.component";
import { ErrorDialogComponent } from 'src/app/dialogs/error-dialog/error-dialog.component';
import { Project } from 'types/project';
@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
  providers: [ProjectsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectAddComponent implements OnInit {

  project: Project = {
    name: '',
    description: ''
  };


  submitted: boolean = false;
  files: File[] = [];


  form: FormGroup = new FormGroup({
    ProjectName: new FormControl('', [Validators.required]),
    ProjectDescription: new FormControl('', []),

  });

  constructor(private projectService: ProjectsService, public dialog: MatDialog, private cdr: ChangeDetectorRef) {
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

  openDialogForError(error: any) {
    this.dialog.open(ErrorDialogComponent, {
      data: { error: error },
      maxWidth: "1000px",
      minWidth: "600px",
      maxHeight: "500px",
      minHeight: "300px"
    });
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
  uploadProject() {

    const formData: FormData = new FormData()
    formData.append('name', this.form.value.ProjectName);
    formData.append("description", this.form.value.ProjectDescription);

    this.openDialogForAddingProjects()
    this.projectService.createProject(formData)
      .subscribe(response => {
        this.submitted = true;

        this.clearForm()
      }, error => {
        //@ts-ignore
        if (error !== {}) {
          this.openDialogForError(error.error)
        }
        throwError(error)
      });

  }

  clearForm() {
    (<HTMLFormElement>document.getElementById("addProjectForm")).reset();
  }

}
