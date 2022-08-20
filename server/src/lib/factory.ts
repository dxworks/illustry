
import { BZL, bzlType } from "./bzl/bzl";
import { IllustrationDBACC } from "./dbacc/illustrations";
import { ProjectDBACC } from "./dbacc/project";

export class Factory {
  private static _instance: Factory;
  private _illustrationDBACC!: IllustrationDBACC;
  private _projectDBACC!: ProjectDBACC;
  private _bzl: bzlType;
  constructor() {
    if (Factory._instance) {
      throw new Error("Use Factory getInstance() instead");
    }
    this._bzl = BZL;
    Factory._instance = this;
  }

  static getInstance(): Factory {
    return Factory._instance || new Factory();
  }

  get IllustrationDBACC(): IllustrationDBACC {
    return this._illustrationDBACC
      ? this._illustrationDBACC
      : (this._illustrationDBACC = new IllustrationDBACC());
  }

  get ProjectDBACC(): ProjectDBACC {
    return this._projectDBACC
      ? this._projectDBACC
      : (this._projectDBACC = new ProjectDBACC());
  }
  get BZL(): bzlType {
    return this._bzl;
  }
}
