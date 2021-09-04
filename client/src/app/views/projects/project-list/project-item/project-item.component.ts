import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../../../types/projects.model";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input()
  project: Project = <Project>{};
  @Input()
  index: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
