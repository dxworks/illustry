import { CalendarHeatmap, DOT, FLG, Gantt, HEB, HorizontalChart, HorizontalStackedCharts, Matrix, Sankey, Timeline, VerticalStackedCharts } from "./illustrations.";

export interface Project {
    ProjectName: string;
    ProjectDescription: string;
    IllustrationName?: string;
    IllustrationData?: DOT | CalendarHeatmap | FLG | HEB | Sankey | VerticalStackedCharts | HorizontalStackedCharts | HorizontalChart | Gantt | Matrix | Timeline | any;
    Tags?: string[]
}