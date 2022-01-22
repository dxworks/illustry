import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import * as _ from 'lodash';
import { CalendarMatrixTypes } from 'src/app/entities/calendarMatrix-types';
import 'zrender/lib/svg/svg';
@Component({
  selector: 'app-calendarheatmap',
  templateUrl: './calendarheatmap.component.html',
  styleUrls: ['./calendarheatmap.component.css']
})
export class CalendarheatmapComponent implements OnInit, OnDestroy {
  @Input()
  data: CalendarMatrixTypes | undefined
  @Output()
  option!: EChartsOption;
  @Output()
  cpuLoadChartOptions: EChartsOption = {};
  ngOnInit(): void {
    if (this.data) {
      this.createCalendar(this.data)
    }
  }
  ngOnDestroy(): void {
    echarts.disconnect
  }
  createCalendar(data: CalendarMatrixTypes) {

    var chartDom = document.getElementById('main')!;


    this.option = {
      darkMode: "auto",
      height: window.innerHeight,
      tooltip: {
        position: 'top',
        // trigger: 'item',
        //@ts-ignore
        formatter: function (params) {
          //@ts-ignore
          return params.seriesName
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
  createCalendarField(data: CalendarMatrixTypes) {
    let top = 100
    let calendar: { range: string; cellSize: (string | number)[]; top: number; }[] = [];
    //@ts-ignore
    _.each(data.calendar[0], function (val, key) {
      calendar.push({ range: key, cellSize: ['auto', 20], top: top })
      top = top + 200
    });
    return calendar
  }
  createSeries(data: CalendarMatrixTypes) {
    let series: any[] = [];
    let calendarIndex = 0;
    let properties: string = ""
    //@ts-ignore
    _.each(data.calendar[0], function (val, key) {
      _.forEach(val, (v: any) => {
        if (typeof v.properties === 'object') {
          _.each(v.properties, function (val, key) {
            properties = properties + `<div style= "font-weight: bold" >${key}:${val}</div>`
          })
          properties = properties + `<div style = "font-weight: bold">value:${v.value}</div>`
          series.push({
            type: 'heatmap', coordinateSystem: 'calendar', calendarIndex: calendarIndex, data: [[v.date, v.value]], name: properties
          })
          properties = ""
        }
        else {
          if (typeof v.properties === 'string') {

            series.push({
              type: 'heatmap', coordinateSystem: 'calendar', calendarIndex: calendarIndex, data: [[v.date, v.value]], name: v.properties
            })
          }
          else {
            let properties: string = `<div style = "font-weight: bold">value:${v.value}<div>`
            series.push({
              type: 'heatmap', coordinateSystem: 'calendar', calendarIndex: calendarIndex, data: [[v.date, v.value]], name: properties
            })
          }
        }
      })
      calendarIndex = calendarIndex + 1
    });

    return series
  }
  plotCpuLoad(): void {
    this.cpuLoadChartOptions = { series: [{ data: [100] }] }
  }
  createIntervals(data: CalendarMatrixTypes) {
    let pieces: any[] = []
    //@ts-ignore
    _.forEach(data.ranges, d => {
      pieces.push({ min: d.min, max: d.max, color: d.color })
    })
    return pieces
  }
}