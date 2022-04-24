

export class Project {
  public _id: string;
  public name: string;
  public description: string;
  constructor( id: string,  projectName: string,  projectDescription: string) {
    this._id = id;
    this.name= projectName;
    this.description = projectDescription;

  }
}
