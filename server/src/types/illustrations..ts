export interface Illustration {
    ProjectId: String;
    ProjectName: String;
    IllustrationType: String;
    IllustrationName: String;
    Tags: String[];
    // IllustrationData: AllIllustrations;
}

export interface AllIllustrations {
    Dot?:DOT
    CalendarMatrix?: any
    Flg?: FLG
    Heb?: HEB
    Sankey?: Sankey
    StackedCharts?: StackedCharts
    VerticalChart?: VerticalChart
    HorizontalChart?: HorizontalChart
    Gantt?: Gantt
}

interface Gantt {
    name:string;
    value?: string;
    children: Gantt[];
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