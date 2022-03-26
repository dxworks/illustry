import { ChangeDetectorRef, Component, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Illustration } from "../../../../types/illustration.model";
import { IllustrationService } from "../../../services/illustration.service";
import { IllustrationForTableModel } from "../../../../types/illustrationForTable.model";
import { MdbTableDirective, MdbTablePaginationComponent } from "angular-bootstrap-md";
import { Project } from "../../../../types/projects.model";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DeleteProjectDialogComponent } from "../../../dialogs/delete-project-dialog/delete-project-dialog.component";
import { UpdateProjectDialogComponent } from "../../../dialogs/update-project-dialog/update-project-dialog.component";
import { DeleteIllustrationDialogComponent } from "../../../dialogs/delete-illustration-dialog/delete-illustration-dialog.component";
import { UpdateIllustrationDialogComponent } from "../../../dialogs/update-illustration-dialog/update-illustration-dialog.component";
import { AddIllustrationDialogComponent } from 'src/app/dialogs/add-illustration-dialog/add-illustration-dialog.component';

@Component({
  selector: 'app-illustration-list',
  templateUrl: './illustration-list.component.html',
  styleUrls: ['./illustration-list.component.css']
})
export class IllustrationListComponent implements OnInit {
  @Input()
  projectName: string = '';

  illustrations: IllustrationForTableModel[] = [];
  //@ts-ignore
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  //@ts-ignore
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  previous: any = [];
  headElements: string[] = ['Id', 'IllustrationName', 'IllustrationType', 'Tags', 'actions'];
  constructor(private illustrationService: IllustrationService, private cdRef: ChangeDetectorRef, private router: Router, private dialog: MatDialog) { }


  searchText: string = '';
  @HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit(): void {
    console.log(this.projectName)
    this.illustrationService.getAllIllustrations(this.projectName).subscribe((illustrations: Illustration[]) => {
      illustrations.forEach((illustrations, index) => {
        // @ts-ignore

        this.illustrations.push({ index: index + 1, IllustrationName: illustrations.name, IllustrationType: illustrations.type, Tags: illustrations.tags, IllustrationData: illustrations.data })
      });
      this.mdbTable.setDataSource(this.illustrations);
      this.illustrations = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }

  ngAfterViewInit() {
    this.mdbTablePagination.hideDescription = true;
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.illustrations = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.illustrations = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['IllustrationName', 'IllustrationType']); //here tags also need to be put
      this.mdbTable.setDataSource(prev);
    }
  }
  openDialogForDeletingIllustration(illustrationName: string) {
    this.dialog.open(DeleteIllustrationDialogComponent, {
      data: {
        illustrationName: illustrationName,
        projectName: this.projectName
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
