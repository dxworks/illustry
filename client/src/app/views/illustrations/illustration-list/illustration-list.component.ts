import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IllustrationService } from "../../../services/illustration.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DeleteIllustrationDialogComponent } from "../../../dialogs/delete-illustration-dialog/delete-illustration-dialog.component";
import { AddIllustrationDialogComponent } from 'src/app/dialogs/add-illustration-dialog/add-illustration-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Illustration } from 'types/illustrations';

@Component({
  selector: 'app-illustration-list',
  templateUrl: './illustration-list.component.html',
  styleUrls: ['./illustration-list.component.css']
})
export class IllustrationListComponent implements OnInit,AfterViewInit {
  @Input()
  projectName: string = '';

  illustrations: Illustration[] = [];
  displayedColumns: string[] = ['position', 'name','description', 'type', 'tags', 'actions'];
  dataSource = new MatTableDataSource<Illustration>(this.illustrations)

  @ViewChild(MatSort,{static:true}) sort!: MatSort ;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  constructor(private illustrationService: IllustrationService, private router: Router, private dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer) { }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.illustrationService.RefreshNeeded$.subscribe(() => {
      this.getAllIllustrations()
    })
     this.getAllIllustrations()
  }
  public getAllIllustrations(){
    this.illustrationService.getAllIllustrations(this.projectName).subscribe((illustrations: Illustration[]) => {
      this.dataSource.data = illustrations
    });

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
  openDialogForDeletingIllustration(illustrationName: string,type:string) {
    this.dialog.open(DeleteIllustrationDialogComponent, {
      data: {
        illustrationName: illustrationName,
        projectName: this.projectName,
        type: type
      },
      maxWidth: "500px",
      minWidth: "400px",
      maxHeight: "200px",
      minHeight: "150px"
    })
  }

  openDialogForUpdateIllustration() {
    this.dialog.open(AddIllustrationDialogComponent, {
      data: { projectName: this.projectName },
      maxWidth: "750px",
      minWidth: "700px",
      maxHeight: "600px",
      minHeight: "550px"
    })
  }

  showGraphic(illustrationName: string) {
    this.router.navigate([`projects/${this.projectName}/illustrations/${illustrationName}`]);
  }
}
