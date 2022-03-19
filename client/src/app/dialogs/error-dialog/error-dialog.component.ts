import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { IllustrationService } from 'src/app/services/illustration.service';
@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {
  divShowData: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: { error: any }, private router: Router) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.data))
    this.divShowData = document.getElementById('showData');
    this.divShowData.innerHTML = `${JSON.parse(JSON.stringify(this.data.error))}`

  }
  onPress() {
    this.router.navigate(['../']);
  }
}
