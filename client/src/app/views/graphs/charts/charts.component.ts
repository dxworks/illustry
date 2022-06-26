import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { EchartService } from 'src/app/services/echart.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit, OnDestroy {
  myChart: any;
  @Input()
  data: any;
  color: any;

  constructor(private echartService: EchartService) {}

  ngOnInit(): void {
    if (this.data) {
      this.echartService.createChart(this.data,this.myChart);
    }
  }
  ngOnDestroy(): void {
    this.echartService.destroyChart()
  }

}
