

export class Project {
  public _id: string;
  public Name: string;
  public Description: string;
  constructor( id: string,  projectName: string,  projectDescription: string) {
    this._id = id;
    this.Name= projectName;
    this.Description = projectDescription;

  }
}
