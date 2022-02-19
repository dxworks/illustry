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

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, AfterViewInit {
  projects: ProjectForTableModel[] = [];

  //@ts-ignore
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  //@ts-ignore
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  previous: any = [];
  headElements: string[] = ['Id', 'ProjectName', 'ProjectDescription', ' '];
  constructor(private projectService: ProjectsService, private cdRef: ChangeDetectorRef, private router: Router, private dialog: MatDialog) { }
  searchText: string = '';
  @HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      projects.forEach((project, index) => {
        this.projects.push({ index: index + 1, ProjectDescription: project.ProjectDescription, ProjectName: project.ProjectName })
      });
      this.mdbTable.setDataSource(this.projects);
      this.projects = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }
  onPress() {
    this.router.navigate(['/add']);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.hideDescription = true;
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(100);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.projects = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.projects = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['ProjectDescription', "ProjectName"]);
      this.mdbTable.setDataSource(prev);
    }
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
