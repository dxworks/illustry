import { Component, Input, OnInit } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;
@Component({
  selector: 'app-ploty',
  templateUrl: './ploty.component.html',
  styleUrls: ['./ploty.component.css'],
})
export class PlotyComponent implements OnInit {
  @Input()
  data: any;
  @Input()
  layout: any;
  @Input()
  config?: any;

  ngOnInit() {
  }
}
