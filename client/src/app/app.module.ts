import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsListComponent } from './views/projects/project-list/projects-list.component';
import {ProjectsComponent} from "./views/projects/projects.component";
import { ProjectUpdateComponent } from './views/projects/project-update/project-update.component';
import { ProjectDetailComponent } from './views/projects/project-detail/project-detail.component';

import {MatCardModule} from "@angular/material/card";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {ProjectAddComponent} from "./views/projects/project-add/project-add.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProjectItemComponent } from './views/projects/project-list/project-item/project-item.component';
import { IllustrationsComponent } from './views/illustrations/illustrations.component';
import { IllustrationListComponent } from './views/illustrations/illustration-list/illustration-list.component';
import { IllustrationItemComponent } from './views/illustrations/illustration-list/illustration-item/illustration-item.component';
import { IllustrationAddComponent } from './views/illustrations/illustration-add/illustration-add.component';
import { IllustrationUpdateComponent } from './views/illustrations/illustration-update/illustration-update.component';
import { IllustrationDetailComponent } from './views/illustrations/illustration-detail/illustration-detail.component';
import { ForceLayoutGraphComponent } from './views/graphs/force-layout-graph/force-layout-graph.component';
import { HiearchicalEdgeBundlingComponent } from './views/graphs/hiearchical-edge-bundling/hiearchical-edge-bundling.component';
import { ChartComponent } from './views/graphs/chart/chart.component';
import { GraphsComponent } from './views/graphs/graphs.component';
import {SankyDiagramComponent} from "./views/graphs/sanky-diagram/sanky-diagram.component";
import { HeatmapComponent } from './views/graphs/heatmap/heatmap.component';
import { StackedChartComponent } from './views/graphs/stacked-chart/stacked-chart.component';
import { HorizontalChartComponent } from './views/graphs/horizontal-chart/horizontal-chart.component';
import { MatrixcalendarComponent } from './views/graphs/matrixcalendar/matrixcalendar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsListComponent,
    ProjectsComponent,
    ProjectUpdateComponent,
    ProjectDetailComponent,
    ProjectAddComponent,
    ProjectItemComponent,
    IllustrationsComponent,
    IllustrationListComponent,
    IllustrationItemComponent,
    IllustrationAddComponent,
    IllustrationUpdateComponent,
    IllustrationDetailComponent,
    ForceLayoutGraphComponent,
    HiearchicalEdgeBundlingComponent,
    ChartComponent,
    GraphsComponent,
    SankyDiagramComponent,
    HeatmapComponent,
    StackedChartComponent,
    HorizontalChartComponent,
    MatrixcalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
