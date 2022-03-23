export interface Node {
  group: string;
  id: string;
}

export interface Link {
  source: string;
  target: string;
  value: number;
}

export interface NodesMatrix extends Node {
  properties?: NodeMatrixElements[] 
}
interface NodeMatrixElements {
 
    label: string,
    value: Number,
    style: any
 
}
export interface SankeyNodes extends Node {
  properties?:any|string
}
export interface SankeyLinks extends Link {
  properties?:any|string
}
export interface LinksMatrix extends Link {
  style?: any |string
}
export interface Chart {
  name: string,
  value: number,
  properties?:any|string
}

// //Details for Calendar
// export interface CalendarData {
//   date: string;
//   total: number;
//   details: CalendatDetailsData[]
// }

 
// export interface CalendatDetailsData {
//   name: string;
//   date: string;
//   value: number;
// }
