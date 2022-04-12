import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Illustration } from "../../types/illustration.model";
import { environment } from "../../environments/environment";

const projectUrl = `${environment.backendUrl}/project`;

@Injectable({ providedIn: 'root' })
export class IllustrationService {

  constructor(private httpClient: HttpClient) {
  }

  getAllIllustrations(projectName: string) {
    return this.httpClient.get<Illustration[]>(`${projectUrl}/${projectName}/illustration`)
  }

  getIllustrations(projectName: string, illustrationName: string) {
    return this.httpClient.get<Illustration[]>(`${projectUrl}/${projectName}/illustration/${illustrationName}`)
  }

  createIllustration(projectName: string, data: any) {
    return this.httpClient.post(`${projectUrl}/${projectName}/illustration`, data)
  }

  updateIllustration(projectName: string, illustrationName: string, data: any) {
    return this.httpClient.put(`${projectUrl}/${projectName}/illustration/${illustrationName}`, data)
  }

  deleteIllustration(projectName: string, illustrationName: string) {
    return this.httpClient.delete(`${projectUrl}/${projectName}/illustration/${illustrationName}`)
  }

  getAllIllustrationOfTheSameType(projectName: string, type: string) {
    return this.httpClient.get<Illustration[]>(`${projectUrl}/${projectName}/illustration/type/${type}`)
  }
}


