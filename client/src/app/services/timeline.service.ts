import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import {Timeline} from "../entities/timeline";
import {TimelineQuery} from "../../types/timelineQuery";

const url = `${environment.backendUrl}/timeline`;


@Injectable({ providedIn: 'root' })
export class TimelineService {

  constructor(private httpClient: HttpClient) {
  }

  getAppliedTimelineQuery(timelineQuery: TimelineQuery) {
    return this.httpClient.post<Timeline>(url, timelineQuery)
  }
}
