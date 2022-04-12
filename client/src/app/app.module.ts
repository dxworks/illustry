import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsListComponent } from './views/projects/project-list/projects-list.component';
import { ProjectsComponent } from "./views/projects/projects.component";
import { MatCardModule } from "@angular/material/card";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { ProjectAddComponent } from "./views/projects/project-add/project-add.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IllustrationsComponent } from './views/illustrations/illustrations.component';
import { IllustrationListComponent } from './views/illustrations/illustration-list/illustration-list.component';
import { ForceLayoutGraphComponent } from './views/graphs/force-layout-graph/force-layout-graph.component';
import { HiearchicalEdgeBundlingComponent } from './views/graphs/hiearchical-edge-bundling/hiearchical-edge-bundling.component';
import { VerticalChartComponent } from './views/graphs/vertical-chart/chart.component';
import { GraphsComponent } from './views/graphs/graphs.component';
import { SankyDiagramComponent } from "./views/graphs/sanky-diagram/sanky-diagram.component";
import { HeatmapComponent } from './views/graphs/heatmap/heatmap.component';
import { StackedChartComponent } from './views/graphs/vertical-stacked-chart/stacked-chart.component';
import { HorizontalChartComponent } from './views/graphs/horizontal-chart/horizontal-chart.component';
import { MatrixcalendarComponent } from './views/graphs/matrixcalendar/matrixcalendar.component';
import { MatrixComponent } from './views/graphs/matrix/matrix.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from "@angular/material/icon";
import { AddProjectDialogComponent } from './dialogs/add-project-dialog/add-project-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from "@angular/material/dialog";
import { DotGraphComponent } from './views/graphs/dot-graph/dot-graph.component'
import { NgxDropzoneModule } from "ngx-dropzone";
import { GanttchartComponent } from './views/graphs/ganttchart/ganttchart.component';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTabsModule } from '@angular/material/tabs';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { MatMenuModule } from "@angular/material/menu";
import { DeleteProjectDialogComponent } from './dialogs/delete-project-dialog/delete-project-dialog.component';
import { UpdateProjectDialogComponent } from './dialogs/update-project-dialog/update-project-dialog.component';
import { DeleteIllustrationDialogComponent } from './dialogs/delete-illustration-dialog/delete-illustration-dialog.component';
import { UpdateIllustrationDialogComponent } from './dialogs/update-illustration-dialog/update-illustration-dialog.component';
import { AddIllustrationDialogComponent } from './dialogs/add-illustration-dialog/add-illustration-dialog.component';
import { CalendarheatmapComponent } from './views/graphs/calendarheatmap/calendarheatmap.component';
import { HorizontalStackedChartComponent } from './views/graphs/horizontal-stacked-chart/horizontal-stacked-chart.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;
import { TimelineComponent } from './views/graphs/timeline/timeline.component';
import { ChartsComponent } from './views/graphs/charts/charts.component';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { PlotyComponent } from './views/graphs/ploty/ploty.component';
import { IllustrationComponent } from './views/graphs/illustration/illustration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsListComponent,
    ProjectsComponent,
    ProjectAddComponent,
    IllustrationsComponent,
    IllustrationListComponent,
    ForceLayoutGraphComponent,
    HiearchicalEdgeBundlingComponent,
    VerticalChartComponent,
    GraphsComponent,
    SankyDiagramComponent,
    HeatmapComponent,
    StackedChartComponent,
    HorizontalChartComponent,
    MatrixcalendarComponent,
    MatrixComponent,
    AddProjectDialogComponent,
    DotGraphComponent,
    GanttchartComponent,
    DeleteProjectDialogComponent,
    UpdateProjectDialogComponent,
    DeleteIllustrationDialogComponent,
    UpdateIllustrationDialogComponent,
    AddIllustrationDialogComponent,
    CalendarheatmapComponent,
    HorizontalStackedChartComponent,
    TimelineComponent,
    ChartsComponent,
    ErrorDialogComponent,
    PlotyComponent,
    IllustrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatDialogModule,
    MatMomentDateModule,
    NgxDropzoneModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MDBBootstrapModule,
    MatMenuModule,
    NgxEchartsModule.forRoot({
      echarts,

    }),
    PlotlyModule

  ],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
