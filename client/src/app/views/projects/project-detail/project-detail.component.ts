import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectsService} from "../../../services/projects.service";
import {Project} from "../../../../types/projects.model";
import {flatMap} from "rxjs/internal/operators";
import {IllustrationService} from "../../../services/illustration.service";
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  currentProject:Project = {
    _id: '',
    ProjectName: '',
    ProjectDescription: ''
  };

  message: string = '';
  id: string = '';
  constructor(private projectService: ProjectsService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.message = '';
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.projectService.getProject(this.id)
            .subscribe(project => {
                this.currentProject = project;
              },
              error => {throw Error(error)}
            )
          }
      );
  }

  showIllustrations() {
    this.router.navigate([`/projects/${this.id}/illustrations`]);
  }
  updateProject() {
    this.router.navigate([`/projects/${this.id}/update`]);
  }

  addIllustration() {
    this.router.navigate([`/projects/${this.id}/addIllustration`])
  }

  deleteProject() {
    console.log(this.id);
    this.projectService.deleteProject(this.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/projects']);
        },
        error => {
          console.log(error);
        });
  }
}
