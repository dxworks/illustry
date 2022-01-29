
export interface CalendarMatrixTypes {
  calendar: CalendarData[]
  categories:any,
  tooltip:any
}

export interface CalendarData {
  date:String,
  value:number,
  year:number,
  category:String
}
