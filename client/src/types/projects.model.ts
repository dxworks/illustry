

export class Project {
  public _id: string;
  public ProjectName: string;
  public ProjectDescription: string;
  constructor( id: string,  projectName: string,  projectDescription: string) {
    this._id = id;
    this.ProjectName= projectName;
    this.ProjectDescription = projectDescription;

  }
}
