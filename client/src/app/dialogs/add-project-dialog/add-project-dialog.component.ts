import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onPress() {
    this.router.navigate(['/projects']);
  }
}
