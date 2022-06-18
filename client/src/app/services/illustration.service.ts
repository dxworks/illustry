import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Subject } from 'rxjs';
import {tap} from 'rxjs/operators'
import { Illustration } from 'types/illustrations';
const projectUrl = `${environment.backendUrl}/project`;

@Injectable({ providedIn: 'root' })
export class IllustrationService {

  constructor(private httpClient: HttpClient) {
  }
  private _refreshNeeded$ = new Subject<void>();

  get RefreshNeeded$() {
    return this._refreshNeeded$
  }
  getAllIllustrations(projectName: string) {
    return this.httpClient.get<Illustration[]>(`${projectUrl}/${projectName}/illustration`)
  }

  getIllustrations(projectName: string, illustrationName: string) {
    return this.httpClient.get<Illustration[]>(`${projectUrl}/${projectName}/illustration/${illustrationName}`)
  }

  createIllustration(projectName: string, data: any) {
    return this.httpClient.post(`${projectUrl}/${projectName}/illustration`, data)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next()
      })
      )
  }

  updateIllustration(projectName: string, illustrationName: string, data: any) {
    return this.httpClient.put(`${projectUrl}/${projectName}/illustration/${illustrationName}`, data)
  }

  deleteIllustration(projectName: string, illustrationName: string, type:string) {
    return this.httpClient.delete(`${projectUrl}/${projectName}/illustration/${illustrationName}/${type}`)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next()
      })
      )
  }

  getAllIllustrationOfTheSameType(projectName: string, type: string) {
    return this.httpClient.get<Illustration[]>(`${projectUrl}/${projectName}/illustration/type/${type}`)
  }
}


