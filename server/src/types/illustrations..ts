export interface Illustration {
    ProjectId: String;
    ProjectName: String;
    IllustrationType: String;
    IllustrationName: String;
    Tags: String[];
    IllustrationData: CalendarMatrix | FLG | HEB | Sankey | StackedCharts | VerticalChart | HorizontalChart | DOT;
}

interface DOT {
    nodes: Node[];
    links: Link[];
}

interface CalendarMatrix {
    calendarData: CalendarData[]
}

interface FLG {
    nodes: Node[];
    links: Link[];
}

interface HEB {
    nodes: Node[];
    links: Link[];
}

interface StackedCharts {
    chart: any[];
    subgroups: String[]
}

interface HorizontalChart {
    chart: Chart[];
    label: String;
    maxDomainInterval?: number;
    minDomainInterval?: number;
}

interface VerticalChart {
    chart: Chart[];
    label: String;
    maxDomainInterval?: number;
    minDomainInterval?: number;
}
interface Sankey {
    nodes: Node[];
    links: Link[];
}

//Details for Calendar
interface CalendarData {
    date: String;
    total: number;
    details: CalendatDetailsData[]
}

interface CalendatDetailsData {
    name: String;
    date: String;
    value: number;
}

//Details for FLG HEB Sankey And Dot
interface Node {
    group: String;
    id: String;
}

interface Link {
    source: String;
    target: String;
    value: number;
}

//Details for Horizontal/Vertical Charts 

interface Chart {
    name: String,
    value: number
}