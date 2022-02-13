import { CalendarMatrixTypes } from "src/app/entities/calendarMatrix-types";
import { DotTypes } from "src/app/entities/dot-types";
import { FlgTypes } from "src/app/entities/flg-types";
import { GanttChartTypes } from "src/app/entities/gantChart-types";
import { HebTypes } from "src/app/entities/heb-types";
import { HorizontalStackedChartsTypes } from "src/app/entities/horizontal-stackedchart-types";
import { HorizontalChartTypes } from "src/app/entities/horizontalchart-types";
import { MatrixTypes } from "src/app/entities/matrix-types";
import { SankeyTypes } from "src/app/entities/sankey-types";
import { Timeline } from "src/app/entities/timeline";
import { VerticalStackedChartsTypes } from "src/app/entities/vertical-stackedchart-types";
import { VerticalChartTypes } from "src/app/entities/verticalchart-types";


export class Illustration {
  public _id: string;
  public IllustrationData: DotTypes | CalendarMatrixTypes | FlgTypes | HebTypes | SankeyTypes | HorizontalStackedChartsTypes | VerticalStackedChartsTypes | VerticalChartTypes | HorizontalChartTypes | GanttChartTypes | MatrixTypes | Timeline | any
  public IllustrationName: string;
  public IllustrationType: string;
  public Tags?: string;
  constructor(id: string, illustrationData: DotTypes | CalendarMatrixTypes | FlgTypes | HebTypes | SankeyTypes | HorizontalStackedChartsTypes | VerticalStackedChartsTypes | VerticalChartTypes | HorizontalChartTypes | GanttChartTypes | MatrixTypes | Timeline | any, illustrationName: string, illustrationType: string, tags: string) {
    this._id = id;
    this.IllustrationData = illustrationData;
    this.IllustrationName = illustrationName;
    this.IllustrationType = illustrationType;
    this.Tags = tags

  }
}
