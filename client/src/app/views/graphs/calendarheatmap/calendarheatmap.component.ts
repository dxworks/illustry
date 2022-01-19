import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as d3 from 'd3';
import { color } from 'd3';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import * as _ from 'lodash';
import 'zrender/lib/svg/svg';
@Component({
  selector: 'app-calendarheatmap',
  templateUrl: './calendarheatmap.component.html',
  styleUrls: ['./calendarheatmap.component.css']
})
export class CalendarheatmapComponent implements OnInit, OnDestroy {
  @Input()
  data: any
  @Output()
  option!: EChartsOption;
  @Output()
  cpuLoadChartOptions: EChartsOption = {};
  ngOnInit(): void {
    this.createCalendar(this.data)
  }
  ngOnDestroy(): void {
    console.log("aici")
    echarts.disconnect
  }
  createCalendar(data: any) {

    var chartDom = document.getElementById('main')!;


    this.option = {
      darkMode: "auto",
      height: window.innerHeight,
      tooltip: {
        position: 'top',
        // trigger: 'item',
        //@ts-ignore
        formatter: function (params) {
          console.log(params)
          //@ts-ignore
          return `<hr><div>12</div>`
        }
      },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        top: 30,
        pieces: this.createIntervals(data)
      },

      calendar: this.createCalendarField(data) as echarts.CalendarComponentOption[] | undefined,

      series: this.createSeries(data) as echarts.SeriesOption[] | undefined
    };

    var myChart = echarts.getInstanceByDom(chartDom)
    if (myChart === null) {
      myChart = echarts.init(chartDom);
      this.option && myChart.setOption(this.option);
    }


  }
  createCalendarField(data: any[]) {
    let top = 100
    let calendar: { range: string; cellSize: (string | number)[]; top: number; }[] = [];
    //@ts-ignore
    _.each(data.calendar[0], function (val, key) {
      calendar.push({ range: key, cellSize: ['auto', 20], top: top })
      top = top + 200
    });
    return calendar
  }
  createSeries(data: any[]) {
    let series: any[] = [];
    let calendarIndex = 0;
    let values: any[][] = [];

    //@ts-ignore
    _.each(data.calendar[0], function (val, key) {
      _.forEach(val, (v: any) => {
        values.push([v.date, v.value])
      })
      series.push({
        type: 'heatmap', coordinateSystem: 'calendar', calendarIndex: calendarIndex, data: values
      })
      values = []
      calendarIndex = calendarIndex + 1
    });

    return series
  }
  plotCpuLoad(): void {
    this.cpuLoadChartOptions = { series: [{ data: [100] }] }
  }
  createIntervals(data: any[]) {
    let pieces: any[] = []
    //@ts-ignore
    _.forEach(data.ranges, d => {
      pieces.push({ min: d.min, max: d.max, color: d.color })
    })
    return pieces
  }
}