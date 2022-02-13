export interface Illustration {
    ProjectId: String;
    ProjectName: String;
    IllustrationType: String;
    IllustrationName: String;
    Tags: String[];
}


interface TimelineEventTag {
    name: string
    style: any
}

export interface TimelineEvent {
    summary: string
    date: string
    type: string
    author: string
    tags?: TimelineEventTag[]
    description?: string
    style: any
}

export interface Timeline {
    [date: string]: {
        summary?: {
            title?: string,
            style?: any
        },
        events: TimelineEvent[],
    }
}

export interface CalendarHeatmap {
    calendar: CalendarData[]
    categories: any
    tooltip?: any
}
export interface Matrix {
    nodes: NodesMatrix[]
    links: LinksMatrix[]
}
export interface Gantt {
    name: string;
    value?: string;
    children: Gantt[];
}
export interface DOT {
    nodes: Node[];
    links: Link[];
}

export interface CalendarMatrix {
    calendarData: CalendarData[]
}

export interface FLG {
    nodes: Node[];
    links: Link[];
}

export interface HEB {
    nodes: Node[];
    links: Link[];
}

export interface VerticalStackedCharts {
    chart: any[];
    maxDomainInterval?: number;
    minDomainInterval?: number;
    step?: number;
    colorMapping: any[]
}
export interface HorizontalStackedCharts {
    chart: any[];
    maxDomainInterval?: number;
    minDomainInterval?: number;
    step?: number;
    colorMapping: any[]
}
export interface HorizontalChart {
    chart: Chart[];
    label: String;
    maxDomainInterval?: number;
    minDomainInterval?: number;
}

export interface VerticalChart {
    chart: Chart[];
    label: String;
    maxDomainInterval?: number;
    minDomainInterval?: number;
    step?: number;
}
export interface Sankey {
    nodes: NodesSankey[];
    links: LinksSankey[];
    colorMapping?: any[]
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
    id?: String;
    name?: String;
}
interface NodesMatrix extends Node {
    properties?: [{
        label: String,
        value: Number,
        style: any
    }]
}

interface Link {
    source: String;
    target: String;
    value: number;
}
interface NodesSankey extends Node {
    properties?: any | string
}
interface LinksSankey extends Node {
    properties?: any | string
}
interface LinksMatrix extends Link {
    style?: any
}

interface CalendarData {
    date: String,
    value: number,
    year: number,
    category: String
}
//Details for Horizontal/Vertical Charts 

interface Chart {
    name: String,
    value: number,
    properties?: any | string
}