import {DotTypes} from "./dot-types";
import {CalendarMatrixTypes} from "./calendarMatrix-types";
import {FlgTypes} from "./flg-types";
import {HebTypes} from "./heb-types";
import {SankeyTypes} from "./sankey-types";
import {StackedChartsTypes} from "./stackedchart-types";
import {VerticalChartTypes} from "./verticalchart-types";
import {HorizontalChartTypes} from "./horizontalchart-types";
import {CalendarHeatmap} from "angular2-calendar-heatmap";
import {CalendarHeatmapData} from "../views/graphs/matrixcalendar/matrixcalendar.component";

export interface AllIllustrations {
  Dot?:DotTypes
  CalendarMatrix?: CalendarHeatmapData[]
  Flg?: FlgTypes
  Heb?: HebTypes
  Sankey?: SankeyTypes
  StackedCharts?: StackedChartsTypes
  VerticalChart?: VerticalChartTypes
  HorizontalChart?: HorizontalChartTypes
}
