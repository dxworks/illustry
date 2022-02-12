import { DotTypes } from "./dot-types";
import { CalendarMatrixTypes } from "./calendarMatrix-types";
import { FlgTypes } from "./flg-types";
import { HebTypes } from "./heb-types";
import { SankeyTypes } from "./sankey-types";
import { VerticalStackedChartsTypes } from "./vertical-stackedchart-types";
import { VerticalChartTypes } from "./verticalchart-types";
import { HorizontalChartTypes } from "./horizontalchart-types";
import { GanttChartTypes } from "./gantChart-types";
import { MatrixTypes } from "./matrix-types";
import { HorizontalStackedChartsTypes } from "./horizontal-stackedchart-types";
import {Timeline} from "./timeline";

export interface AllIllustrations {
  Dot?: DotTypes
  CalendarMatrix?: CalendarMatrixTypes
  Flg?: FlgTypes
  Heb?: HebTypes
  Sankey?: SankeyTypes
  HorizontalStackedChart?: HorizontalStackedChartsTypes
  VerticalStackedChart?: VerticalStackedChartsTypes
  VerticalChart?: VerticalChartTypes
  HorizontalChart?: HorizontalChartTypes
  Gantt?: GanttChartTypes
  Matrix?: MatrixTypes
  Timeliner?: any
  Timeline?: Timeline
}
