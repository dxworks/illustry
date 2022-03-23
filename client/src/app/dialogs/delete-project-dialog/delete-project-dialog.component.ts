import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProjectsService } from "../../services/projects.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-delete-project-dialog',
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.css']
})
export class DeleteProjectDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { projectName: string }, private projectService: ProjectsService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteProject(projectName: string) {

    this.projectService.deleteProject(projectName)
      .subscribe(
        response => {
          
          this.router.navigate(['/projects']);
        },
        error => {
          console.log(error);
        });
   
  }
}
