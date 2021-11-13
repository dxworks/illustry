import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { ProjectsService } from "../../../services/projects.service";
import { Project } from "../../../../types/projects.model";
import {ProjectForTableModel} from "../../../../types/projectForTable.model";
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {Router} from "@angular/router";


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit,AfterViewInit {
 projects: ProjectForTableModel[] = [];
 //@ts-ignore
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  //@ts-ignore
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  previous: any = [];
  headElements:string[] = ['id','ProjectName','ProjectDescription','actions'];
  constructor(private projectService: ProjectsService,private cdRef: ChangeDetectorRef, private router: Router) { }
  searchText: string = '';
  @HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      projects.forEach((project,index) => {
        this.projects.push({index:index+1,ProjectDescription:project.ProjectDescription,ProjectName:project.ProjectName})
      });
      this.mdbTable.setDataSource(this.projects);
      this.projects = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(20);

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
      this.projects = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, [ 'ProjectDescription',"ProjectName"]);
      this.mdbTable.setDataSource(prev);
    }
  }

  deleteProject(projectName:string) {

    this.projectService.deleteProject(projectName)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/projects']);
        },
        error => {
          console.log(error);
        });
  }

  showIllustrations(projectName:string) {
    this.router.navigate([`/projects/${projectName}/illustrations`]);
  }
}
