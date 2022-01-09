import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Project } from "../../types/projects.model";
import {environment} from "../../environments/environment";

const baseUrl = `${environment.backendUrl}/projects`;
const projectUrl = `${environment.backendUrl}/project`;

@Injectable({ providedIn: 'root' })
export class ProjectsService {

  constructor(private httpClient: HttpClient) {
  }

  getProjects() {
    return this.httpClient.get<Project[]>(baseUrl)
  }

  getProject(projectName: string) {
    return this.httpClient.get<Project>(`${projectUrl}/${projectName}`)
  }

  createProject(data: FormData) {
    return this.httpClient.post(projectUrl, data)
  }

  updateProject(projectName: string, data: FormData) {
    return this.httpClient.put<Project>(`${projectUrl}/${projectName}`, data)
  }

  deleteProject(projectName: string) {
    return this.httpClient.delete(`${projectUrl}/${projectName}`)
  }

}
