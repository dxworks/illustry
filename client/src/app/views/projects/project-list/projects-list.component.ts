import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../../services/projects.service";
import { Project } from "../../../../types/projects.model";


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
 projects: Project[] = [];

  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: Project[]) => this.projects = projects);
  }

}
