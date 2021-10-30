export interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface GraphNode {
  name: string;
  group?: string;
  formatting?: FormattingRule;
}

export interface GraphLink {
  source: string;
  target: string;
  value?: number;
  formatting?: FormattingRule;
}

export interface FormattingRule {
  properties: string;
  color: string;
  form: FormTypes;
}

export enum FormTypes {
  CIRCLE = 'circle',
  SQUARE = 'square',
  OVAL = 'oval',
  RECTANGLE = 'rectangle',
  RHOMBUS = 'rhombus'
}
