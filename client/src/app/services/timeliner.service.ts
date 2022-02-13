import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Project } from "../../types/projects.model";
import { environment } from "../../environments/environment";

const url = `${environment.backendUrl}/timeliner`;


@Injectable({ providedIn: 'root' })
export class TimelineService {

  constructor(private httpClient: HttpClient) {
  }

  getAppliedTimelineQuery(form: FormData) {
    return this.httpClient.post(url, form)
  }
}
