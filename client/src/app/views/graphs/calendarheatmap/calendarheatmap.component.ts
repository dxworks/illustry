import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import * as _ from 'lodash';
import { CalendarData, CalendarMatrixTypes } from 'src/app/entities/calendarMatrix-types';
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
      console.log(this.data)
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
        formatter: (params) => {
          //@ts-ignore
          return this.createToolTip(data.tooltip, params.data[0], params.data[1])
        }
      },

      visualMap: {
        orient: 'horizontal',
        left: 'center',
        top: 30,
        type: 'piecewise',
        categories: Object.keys(data.categories),
        inRange: { color: Object.values(data.categories) }
      },
      calendar: this.createCalendarField(data.calendar) as echarts.CalendarComponentOption[] | undefined,

      series: this.createSeries(data.calendar) as echarts.SeriesOption[] | undefined
    };
    var myChart = echarts.getInstanceByDom(chartDom)
    if (myChart === null) {
      myChart = echarts.init(chartDom);
      this.option && myChart.setOption(this.option);
    }

  }
  createCalendarField(data: CalendarData[]) {
    let top = 100
    let calendar: any = []
    let years: number[] = Array.from(new Set(data.map((d: any) => { return d.year })))
    //@ts-ignore
    _.each(years, y => {
      calendar.push({ range: y, cellSize: ['auto', 20], top: top })
      top = top + 200
    });
    return calendar
  }
  plotCpuLoad(): void {
    this.cpuLoadChartOptions = { series: [{ data: [100] }] }
  }
  createToolTip(data: any, name: string, value: number) {
    let properties = ""
    if (typeof data[name] === 'string') {
      properties = properties + data[name] + `<div style = "font-weight: bold">value:${value}</div>`
    }
    else {
      if (typeof data[name] === 'object') {
        _.forEach(Object.keys(data[name]), n => {
          _.forEach(Object.values(data[name]), v => {
            if (data[name][n] === v) {
              properties = properties + `<div style = "font-weight: bold">${n}:${v}</div>`
            }
          })
        })
        properties = properties + `<div style = "font-weight: bold">value:${value}</div>`
      }
      else {
        properties = `<div style = "font-weight: bold">value:${value}</div>`
      }
    }
    return properties
  }

  createSeries(data: CalendarData[]) {
    let series: any[] = [];
    let index = 0;
    const indexMap: any = [];
    let years: number[] = Array.from(new Set(data.map((d: any) => { return d.year })))
    _.forEach(years, y => {
      indexMap.push({ year: y, calendarIndex: index })
      index = index + 1;
    })
    _.forEach(data, d => {
      _.forEach(indexMap, iM => {
        if (d.year === iM.year) {
          series.push({ type: 'heatmap', coordinateSystem: 'calendar', calendarIndex: iM.calendarIndex, data: [[d.date, d.value, d.category]] })
        }
      })
    })
    return series
  }
}
