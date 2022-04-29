import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { Project } from '../../../../types/projects.model';
import { ProjectForTableModel } from '../../../../types/projectForTable.model';
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProjectDialogComponent } from '../../../dialogs/delete-project-dialog/delete-project-dialog.component';
import { UpdateProjectDialogComponent } from '../../../dialogs/update-project-dialog/update-project-dialog.component';
import { AddIllustrationDialogComponent } from '../../../dialogs/add-illustration-dialog/add-illustration-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
})
export class ProjectsListComponent implements OnInit, AfterViewInit {

  projects: Project[] = [];
  displayedColumns: string[] = ['position', 'name', 'description','actions'];
  dataSource = new MatTableDataSource<Project>(this.projects);

  @ViewChild(MatSort,{static:true}) sort!: MatSort ;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  constructor(
    private projectService: ProjectsService,
    private router: Router,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.projectService.RefreshNeeded$.subscribe(() => {
      this.getAllProjects()
    })
     this.getAllProjects()
  }
  public getAllProjects() {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      console.log(projects)
      this.dataSource.data = projects
    })
  }

  applyFilter(event:any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase()
  }
 announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}
  openDialogForDeletingProjects(projectName: string) {
    this.dialog.open(DeleteProjectDialogComponent, {
      data: { projectName: projectName },
      maxWidth: '500px',
      minWidth: '400px',
      maxHeight: '200px',
      minHeight: '150px',
    });
  }

  openDialogForUpdateProjects(projectName: string) {
    this.dialog.open(UpdateProjectDialogComponent, {
      data: { projectName: projectName },
      maxWidth: '600px',
      minWidth: '500px',
      maxHeight: '600px',
      minHeight: '500px',
    });
  }

  // openDialogForAddingIllustrations(projectName: string) {
  //   this.dialog.open(AddIllustrationDialogComponent, {
  //     data: { projectName: projectName },
  //     maxWidth: '750px',
  //     minWidth: '700px',
  //     maxHeight: '600px',
  //     minHeight: '550px',
  //   });
  // }
  addProjects() {
    this.router.navigate(['/add'])
  }
  showIllustrations(projectName: string) {
    this.router.navigate([`/projects/${projectName}/illustrations`]);
  }
}
