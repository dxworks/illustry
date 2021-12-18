import { Component, OnInit } from '@angular/core';
import { Illustration } from "../../../types/illustration.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { IllustrationService } from "../../services/illustration.service";
import {CalendarHeatmapData} from "./matrixcalendar/matrixcalendar.component";
import {CalendarHeatmap} from "angular2-calendar-heatmap";

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  projectName = "";
  illustrationName = "";
  currentIllustration: Illustration = {
    _id: '',
    IllustrationName: '',
    IllustrationData: {},
    IllustrationType: '',
    Tags: ''
  };
  calendarHeatMap:CalendarHeatmapData[] = []
  constructor(private illustrationService: IllustrationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.projectName = params['projectName'];
          this.illustrationName = params['illustrationName'];
          this.illustrationService.getIllustration(this.projectName, this.illustrationName)
            .subscribe(illustration => {

              this.currentIllustration = illustration;
              },
              error => {
                throw Error(error)
              })
        });
  }
}
