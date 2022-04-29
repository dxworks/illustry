import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from "../../../services/projects.service";
import { Project } from "../../../../types/projects.model";
import { ProjectForTableModel } from "../../../../types/projectForTable.model";
import { MdbTableDirective, MdbTablePaginationComponent } from "angular-bootstrap-md";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DeleteProjectDialogComponent } from "../../../dialogs/delete-project-dialog/delete-project-dialog.component";
import { UpdateProjectDialogComponent } from "../../../dialogs/update-project-dialog/update-project-dialog.component";
import { AddIllustrationDialogComponent } from "../../../dialogs/add-illustration-dialog/add-illustration-dialog.component";
import {cloneDeep} from "lodash";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: ProjectForTableModel[] = [];
  initialProjects: ProjectForTableModel[] = [];
  previous: any = [];
  constructor(private projectService: ProjectsService, private cdRef: ChangeDetectorRef, private router: Router, private dialog: MatDialog) { }
  searchText: string = '';
  @HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      projects.forEach((project, index) => {
        this.projects.push({ index: index + 1, ProjectDescription: project.description, ProjectName: project.name })
      });
      this.initialProjects = cloneDeep(this.projects);
    });
  }
  onPress() {
    this.router.navigate(['/add']);
  }
  searchItems() {
    if (!this.searchText) {
      this.projects = this.initialProjects;
    }
    if (this.searchText) {
      this.projects = this.initialProjects.filter(p => p.ProjectName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        p.ProjectDescription.toLowerCase().includes(this.searchText.toLowerCase()));    }
  }

  openDialogForDeletingProjects(projectName: string) {
    this.dialog.open(DeleteProjectDialogComponent, {
      data: { projectName: projectName },
      maxWidth: "500px",
      minWidth: "400px",
      maxHeight: "200px",
      minHeight: "150px"
    })
  }

  openDialogForUpdateProjects(projectName: string) {
    this.dialog.open(UpdateProjectDialogComponent, {
      data: { projectName: projectName },
      maxWidth: "600px",
      minWidth: "500px",
      maxHeight: "600px",
      minHeight: "500px"
    })
  }

  openDialogForAddingIllustrations(projectName: string) {
    this.dialog.open(AddIllustrationDialogComponent, {
      data: { projectName: projectName },
      maxWidth: "750px",
      minWidth: "700px",
      maxHeight: "600px",
      minHeight: "550px"
    })
  }



  showIllustrations(projectName: string) {
    this.router.navigate([`/projects/${projectName}/illustrations`]);
  }
}
