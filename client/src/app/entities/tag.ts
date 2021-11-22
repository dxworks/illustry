export interface TagValue {
  isCherryPicked: boolean;
  value: number;
}

export class Tag {
  constructor(public name: string,
    public category: string,
    public fullyQualifiedName: string,
    public query: string,
    public low: number,
    public medium: number,
    public min: number,
    public max: number,
    public data: Map<string, TagValue>,
    public distribution: { x: number, y: number }[],
    public tagType?: string,
    public active?: number,
    public priority?: number) {
  }
}
