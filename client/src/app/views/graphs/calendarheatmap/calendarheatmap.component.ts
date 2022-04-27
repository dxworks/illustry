import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import * as _ from 'lodash';
import { CalendarData, CalendarMatrixTypes } from 'src/app/entities/calendarMatrix-types';
import 'zrender/lib/svg/svg';

@Component({
  selector: 'app-calendarheatmap',
  templateUrl: './calendarheatmap.component.html',
  styleUrls: ['./calendarheatmap.component.scss']
})
export class CalendarheatmapComponent implements OnInit, OnDestroy {
  myChart: any
  @Input()
  data: CalendarMatrixTypes | undefined
  option!: EChartsOption;
  cpuLoadChartOptions: EChartsOption = {};

  public height = 1000

  ngOnInit(): void {
    if (this.data) {
      this.createCalendar(this.data)
    }
  }

  ngOnDestroy(): void {
    echarts.disconnect
    // this.myChart.dispose()
    console.log("calendar destroyed")
  }

  createCalendar(data: CalendarMatrixTypes) {
    var chartDom = document.getElementById('main')!;
    this.option = {
      toolbox: {
        show: true
      },
      darkMode: "auto",
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
        calculable: true,
        min: 0,
        max: 50,
        maxOpen: true,
        // categories: Object.keys(data.categories),
        inRange : {
          color: ['#c4f2d0', '#00691c' ] //From smaller to bigger value ->
        }
      },
      calendar: this.createCalendarField(data.calendar) as echarts.CalendarComponentOption[] | undefined,

      series: this.createSeries(data.calendar) as echarts.SeriesOption[] | undefined
    };
    this.myChart = echarts.getInstanceByDom(chartDom)
    if (this.myChart === null) {
      this.myChart = echarts.init(chartDom);
      this.option && this.myChart.setOption(this.option);
    }

  }

  createCalendarField(data: CalendarData[]) {
    let top = 100
    let calendar: any = []
    let years: number[] = Array.from(new Set(data.map((d: any) => {
      return d.year
    }))).sort((a, b) => b - a)
    //@ts-ignore
    _.each(years, y => {
      calendar.push({range: y, cellSize: ['auto', 20], top: top})
      top = top + 200
    });
    this.height = top
    return calendar
  }

  plotCpuLoad(): void {
    this.cpuLoadChartOptions = {series: [{data: [100]}]}
  }

  createToolTip(data: any, name: string, value: number) {
    let properties = ""
    if (typeof data[name] === 'string') {
      properties = properties + data[name] + `<div style = "font-weight: bold">value:${value}</div>`
    }
    else {
      if (typeof data[name] === 'object') {
        Object.keys(data[name]).forEach(key => {
          properties = properties + `<div style = "font-weight: bold">${key}:${data[name][key]}</div>`
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
    let index = 0;
    const indexMap = new Map<string, number>();
    let years: number[] = Array.from(new Set(data.map((d: any) => {
      return d.year
    }))).sort((a, b) => b - a)
    _.forEach(years, y => {
      indexMap.set(y + '', index)
      index = index + 1;
    })

    const dataByYears = _.groupBy(data, d => d.year)

    return Object.keys(dataByYears).map(year =>
      ({
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: indexMap.get(year),
        // data: dataByYears[year].map(d => [d.date, d.value, d.category])
        data: dataByYears[year].map(d => [d.date, d.value])
      })
    )

    // _.forEach(data, d => {
    //   _.forEach(indexMap, iM => {
    //     if (d.year === iM.year) {
    //       series.push({ type: 'heatmap', coordinateSystem: 'calendar', calendarIndex: iM.calendarIndex, data: [[d.date, d.value, d.category]] })
    //     }
    //   })
    // })
  }
}
