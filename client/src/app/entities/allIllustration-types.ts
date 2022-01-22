import { DotTypes } from "./dot-types";
import { CalendarMatrixTypes } from "./calendarMatrix-types";
import { FlgTypes } from "./flg-types";
import { HebTypes } from "./heb-types";
import { SankeyTypes } from "./sankey-types";
import { StackedChartsTypes } from "./stackedchart-types";
import { VerticalChartTypes } from "./verticalchart-types";
import { HorizontalChartTypes } from "./horizontalchart-types";
import { GanttChartTypes } from "./gantChart-types";
import { MatrixTypes } from "./matrix-types";

export interface AllIllustrations {
  Dot?: DotTypes
  CalendarMatrix?: CalendarMatrixTypes
  Flg?: FlgTypes
  Heb?: HebTypes
  Sankey?: SankeyTypes
  StackedCharts?: StackedChartsTypes
  VerticalChart?: VerticalChartTypes
  HorizontalChart?: HorizontalChartTypes
  Gantt?: GanttChartTypes
  Matrix?: MatrixTypes
}
