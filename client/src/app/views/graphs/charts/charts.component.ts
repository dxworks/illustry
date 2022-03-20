import { Component, Input, OnInit, Output } from '@angular/core';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @Input()
  data: any
  color: any;
  @Output()
  option!: echarts.EChartsOption;
  constructor() {
  }

  ngOnInit(): void {
    if (this.data) {
      //@ts-ignore
      this.createChart(this.data)
    }
  }
  ngOnDestroy(): void {
    echarts.disconnect
  }

  private createChart(data: any) {

    var chartDom = document.getElementById('main')!;
    this.option = this.data
    var myChart = echarts.getInstanceByDom(chartDom)
    if (myChart === null) {
      myChart = echarts.init(chartDom);
      this.option && myChart.setOption(this.option);
    }
  }
}