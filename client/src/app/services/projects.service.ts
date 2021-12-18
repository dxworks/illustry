import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Project } from "../../types/projects.model";

const baseUrl = 'http://localhost:3000/projects';
const projectUrl = 'http://localhost:3000/project';

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
