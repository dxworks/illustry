import { Component, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as d3 from 'd3';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnDestroy {
  myChart:any
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
    this.myChart.dispose()
    console.log("chart destroyed")
  }

  private createChart(data: any) {
    data.series?.forEach((s: any) => {
      if (s.type === 'wordCloud') {
        if (s.maskImage) {
          var image = new Image()
          image.src = s.maskImage
          s.maskImage = image
        }
      }
    })
    var chartDom = document.getElementById('main')!;
    this.option = data
    this.myChart = echarts.getInstanceByDom(chartDom)
    if (this.myChart === null) {
      this.myChart = echarts.init(chartDom);
      this.option && this.myChart.setOption(this.option);
    }
  }
}