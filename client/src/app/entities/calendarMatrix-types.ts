
export interface CalendarMatrixTypes {
  calendar: CalendarData[]
  categories: any,
  tooltip: any
}

export interface CalendarData {
  date: string,
  value: number,
  year: number,
  category: string
}
