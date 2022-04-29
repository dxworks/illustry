import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Project } from "../../types/projects.model";
import { environment } from "../../environments/environment";
import { Subject } from 'rxjs';
import {tap} from 'rxjs/operators'
const baseUrl = `${environment.backendUrl}/projects`;
const projectUrl = `${environment.backendUrl}/project`;

@Injectable({ providedIn: 'root' })
export class ProjectsService {

  constructor(private httpClient: HttpClient) {
  }
  private _refreshNeeded$ = new Subject<void>();

  get RefreshNeeded$() {
    return this._refreshNeeded$
  }
  getProjects() {
    return this.httpClient.get<Project[]>(baseUrl)
  }

  getProject(projectName: string) {
    return this.httpClient.get<Project>(`${projectUrl}/${projectName}`)
  }

  createProject(data: FormData) {

    return this.httpClient.post(projectUrl, data)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next()
      })
      )
  }

  updateProject(projectName: string, data: FormData) {
    return this.httpClient.put(`${projectUrl}/${projectName}`, data)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next()
      })
      )
  }

  deleteProject(projectName: string) {
    return this.httpClient.delete(`${projectUrl}/${projectName}`)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next()
      })
      )
  }


}
