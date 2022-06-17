
import { API, apiType } from "../api/api";
import { IllustrationBZL } from "./lib/illustrations";
import { ProjectBZL } from "./lib/project";
import { TimelineComputeBZL } from "./lib/timelineCompute";

export class Factory {
  private static _instance: Factory;
  private _illustrationBzl!: IllustrationBZL;
  private _timelineComputeBzl!: TimelineComputeBZL;
  private _projectBzl!: ProjectBZL;
  private _api: apiType;
  constructor() {
    if (Factory._instance) {
      throw new Error("Use Factory getInstance() instead");
    }
    this._api = API;
    Factory._instance = this;
  }

  static getInstance(): Factory {
    return Factory._instance || new Factory();
  }

  get illustrationBzl(): IllustrationBZL {
    return this._illustrationBzl
      ? this._illustrationBzl
      : (this._illustrationBzl = new IllustrationBZL());
  }
  get timelineComputeBzl(): TimelineComputeBZL {
    return this._timelineComputeBzl
      ? this._timelineComputeBzl
      : (this._timelineComputeBzl = new TimelineComputeBZL());
  }
  get projectBzl(): ProjectBZL {
    return this._projectBzl
      ? this._projectBzl
      : (this._projectBzl = new ProjectBZL());
  }
  get api(): apiType {
      return this._api;
  }
}
