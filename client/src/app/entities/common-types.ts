export interface Node {
  group: String;
  id: String;
}

export interface Link {
  source: String;
  target: String;
  value: number;
}

export interface Chart {
  name: String,
  value: number
}

//Details for Calendar
export interface CalendarData {
  date: String;
  total: number;
  details: CalendatDetailsData[]
}

export interface CalendatDetailsData {
  name: String;
  date: String;
  value: number;
}
