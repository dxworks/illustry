import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectAddComponent } from "./views/projects/project-add/project-add.component";
import { ProjectsComponent } from "./views/projects/projects.component";
import { IllustrationsComponent } from "./views/illustrations/illustrations.component";
import { GraphsComponent } from "./views/graphs/graphs.component";

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  {
    path: 'projects',
    component: ProjectsComponent,
    children: []
  },

  {
    path: 'projects/:projectName/illustrations',
    component: IllustrationsComponent,

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
