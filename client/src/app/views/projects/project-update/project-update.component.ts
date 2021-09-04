import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectsService} from "../../../services/projects.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {
  id = '';
  projectDescription=''
  constructor(private route: ActivatedRoute,private router: Router, private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          console.log(this.id)
        })
  }

  updateProject() {
    const formData: FormData = new FormData();
    formData.append('ProjectDescription', this.projectDescription)

    this.projectService.updateProject(this.id,formData)
      .subscribe(response => {
      console.log(response)
    }, error => {
      throwError(error)
    })
    this.back()
  }

  back() {
    this.router.navigate([".."]);
  }
}
