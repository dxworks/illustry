import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IllustrationService } from "../../services/illustration.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-delete-illustration-dialog',
  templateUrl: './delete-illustration-dialog.component.html',
  styleUrls: ['./delete-illustration-dialog.component.css']
})
export class DeleteIllustrationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { illustrationName: string, projectName: string }, private illustrationService: IllustrationService, private router: Router) { }

  ngOnInit(): void {
  }
  deleteIllustration() {
    this.illustrationService.deleteIllustration(this.data.projectName, this.data.illustrationName).subscribe()
  }
}
