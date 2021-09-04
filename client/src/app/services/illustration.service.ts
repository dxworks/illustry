import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Illustration} from "../../types/illustration.model";

const projectUrl = 'http://localhost:3000/project';

@Injectable({providedIn:'root'})
export class IllustrationService {

  constructor(private httpClient: HttpClient) {
  }

  getAllIllustrations(id:string) {
    return this.httpClient.get<Illustration[]>(`${projectUrl}/${id}/illustration`)
  }

  getIllustration(id: string, illustrationId:string) {
    return this.httpClient.get<Illustration>(`${projectUrl}/${id}/illustration/${illustrationId}`)
  }

  createIllustration(id:string,data:any) {
    return this.httpClient.post(`${projectUrl}/${id}/illustration`, data)
  }

  updateIllustration(id: string, illustrationId:string, data:any) {
    return this.httpClient.put(`${projectUrl}/${id}/illustration/${illustrationId}`, data)
  }

  deleteIllustration(id:string, illustrationId:string) {
    return this.httpClient.delete(`${projectUrl}/${id}/illustration/${illustrationId}`)
  }
}
