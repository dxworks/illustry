import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit,OnDestroy {


  constructor() { }

  ngOnInit(): void {

  }
  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Cleared');
  }
}
