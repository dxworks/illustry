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
import {GraphsComponent} from "./views/graphs/graphs.component";

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      {
        path: ':projectName',
        component: ProjectDetailComponent
      },
      {
        path: ':projectName/update',
        component: ProjectUpdateComponent
      },
      {
        path:':projectName/addIllustration',
        component: IllustrationAddComponent
      }
        ]
      },

  {
    path: 'projects/:projectName/illustrations',
    component: IllustrationsComponent,
    children: [
      {
        path: ':illustrationName',
        component: IllustrationDetailComponent
      },
      {
        path: ':illustrationName/update',
        component: IllustrationUpdateComponent
      },
    ]
  },
  {
    path: 'projects/:projectName/illustrations/:illustrationName/illustration',
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
