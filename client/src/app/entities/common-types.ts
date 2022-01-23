export interface Node {
  group: String;
  id: String;
}

export interface Link {
  source: String;
  target: String;
  value: number;
}

export interface NodesMatrix extends Node {
  properties?: [{
      label: String,
      value: Number,
      style: any
  }] 
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
  name: String,
  value: number
}

// //Details for Calendar
// export interface CalendarData {
//   date: String;
//   total: number;
//   details: CalendatDetailsData[]
// }

 
// export interface CalendatDetailsData {
//   name: String;
//   date: String;
//   value: number;
// }
