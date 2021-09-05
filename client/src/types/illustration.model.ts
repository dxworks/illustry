

export class Illustration {
  public _id: string;
  public IllustrationData: any[];
  public IllustrationName: string;
  public IllustrationType: string;
  public Tags?: string;
  constructor( id: string,  illustrationData: any[],  illustrationName: string, illustrationType: string, tags: string) {
    this._id = id;
    this.IllustrationData= illustrationData;
    this.IllustrationName = illustrationName;
    this.IllustrationType = illustrationType;
    this.Tags = tags

  }
}
