import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProjectsService } from "../../services/projects.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-update-project-dialog',
  templateUrl: './update-project-dialog.component.html',
  styleUrls: ['./update-project-dialog.component.css']
})
export class UpdateProjectDialogComponent implements OnInit {

  form: FormGroup = new FormGroup({ ProjectDescription: new FormControl('', []) });
  constructor(@Inject(MAT_DIALOG_DATA) public data: { projectName: string }, private projectService: ProjectsService, private router: Router) { }

  ngOnInit(): void {
  }

  updateProject(projectName: string) {
    const formData: FormData = new FormData();
    formData.append("ProjectDescription", this.form.value.ProjectDescription);

    this.projectService.updateProject(projectName, formData)
      .subscribe(response => {
      }, error => {
        throwError(error)
      })
    this.back()
  }

  back() {
    this.router.navigate([".."]);
  }
}
