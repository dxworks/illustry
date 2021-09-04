import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectDetailComponent} from "./views/projects/project-detail/project-detail.component";
import {ProjectAddComponent} from "./views/projects/project-add/project-add.component";
import {ProjectsComponent} from "./views/projects/projects.component";
import {ProjectUpdateComponent} from "./views/projects/project-update/project-update.component";
import {IllustrationsComponent} from "./views/illustrations/illustrations.component";
import {IllustrationDetailComponent} from "./views/illustrations/illustration-detail/illustration-detail.component";
import {IllustrationAddComponent} from "./views/illustrations/illustration-add/illustration-add.component";
import {IllustrationUpdateComponent} from "./views/illustrations/illustration-update/illustration-update.component";
import {ForceLayoutGraphComponent} from "./views/graphs/force-layout-graph/force-layout-graph.component";
import {HiearchicalEdgeBundlingComponent} from "./views/graphs/hiearchical-edge-bundling/hiearchical-edge-bundling.component";
import {ChartComponent} from "./views/graphs/chart/chart.component";
import {GraphsComponent} from "./views/graphs/graphs.component";
//import {SankyDiagramComponent} from "./views/graphs/sanky-diagram/sanky-diagram.component";

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      {
        path: ':id',
        component: ProjectDetailComponent
      },
      {
        path: ':id/update',
        component: ProjectUpdateComponent
      },
      {
        path:':id/addIllustration',
        component: IllustrationAddComponent
      }
        ]
      },

  {
    path: 'projects/:id/illustrations',
    component: IllustrationsComponent,
    children: [
      {
        path: ':illId',
        component: IllustrationDetailComponent
      },
      {
        path: ':illId/update',
        component: IllustrationUpdateComponent
      },
    ]
  },
  {
    path: 'projects/:id/illustrations/:illId/illustration',
    component: GraphsComponent
  },

  {
    path: 'add',
    component: ProjectAddComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
