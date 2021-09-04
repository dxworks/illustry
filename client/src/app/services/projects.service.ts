import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Project} from "../../types/projects.model";

const baseUrl = 'http://localhost:3000/projects';
const projectUrl = 'http://localhost:3000/project';

@Injectable({providedIn:'root'})
export class ProjectsService {

  constructor(private httpClient: HttpClient) {
  }

  getProjects() {
    return this.httpClient.get<Project[]>(baseUrl)
  }

  getProject(id: string) {
    return this.httpClient.get<Project>(`${projectUrl}/${id}`)
  }

  createProject(data:any) {
    return this.httpClient.post(projectUrl, data)
  }

  updateProject(id: string, data:any) {
    return this.httpClient.put<Project>(`${projectUrl}/${id}`, data)
  }

  deleteProject(id:string) {
    return this.httpClient.delete(`${projectUrl}/${id}`)
  }

}
