import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as _ from 'lodash';
import { CalendarData, CalendarHeatmap } from 'types/illustrations';
import * as echarts from 'echarts';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  createCalendar(data: any,option: EChartsOption,chart: any, height = 1000) {
    var chartDom = document.getElementById('main')!;
      option = {
      toolbox: {
        show: true,
      },
      darkMode: 'auto',
      tooltip: {
        position: 'top',
        // trigger: 'item',
        //@ts-ignore
        formatter: (params) => {
          //@ts-ignore
          return this.createToolTip(
            data.tooltip,
              //@ts-ignore
            params.data[0],
              //@ts-ignore
            params.data[1]
          );
        },
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
        categories: Object.keys(data.categories),
        // inRange : {
        //   color: ['#c4f2d0', '#00691c' ] //From smaller to bigger value ->
        // }
      },
      calendar: this.createCalendarField(data.calendar, height) as
        | echarts.CalendarComponentOption[]
        | undefined,

      series: this.createSeries(data.calendar) as
        | echarts.SeriesOption[]
        | undefined,
    };
    console.log(option)
    chart = echarts.getInstanceByDom(chartDom);
      chart = echarts.init(chartDom);
    return option && chart.setOption(data);
  }
  private createCalendarField(data: CalendarData[], height: number) {
    let top = 100;
    let calendar: any = [];
    let years: number[] = Array.from(
      new Set(
        data.map((d: any) => {
          return d.year;
        })
      )
    ).sort((a, b) => b - a);
    //@ts-ignore
    _.each(years, (y) => {
      calendar.push({ range: y, cellSize: ['auto', 20], top: top });
      top = top + 200;
    });
    height = top;
    return calendar;
  }



  private createToolTip(data: any, name: string, value: number) {
    let properties = '';
    if (typeof data[name] === 'string') {
      properties =
        properties +
        data[name] +
        `<div style = "font-weight: bold">value:${value}</div>`;
    } else {
      if (typeof data[name] === 'object') {
        Object.keys(data[name]).forEach((key) => {
          properties =
            properties +
            `<div style = "font-weight: bold">${key}:${data[name][key]}</div>`;
        });
        properties =
          properties + `<div style = "font-weight: bold">value:${value}</div>`;
      } else {
        properties = `<div style = "font-weight: bold">value:${value}</div>`;
      }
    }
    return properties;
  }

  private createSeries(data: CalendarData[]) {
    let index = 0;
    const indexMap = new Map<string, number>();
    let years: number[] = Array.from(
      new Set(
        data.map((d: any) => {
          return d.year;
        })
      )
    ).sort((a, b) => b - a);
    _.forEach(years, (y) => {
      indexMap.set(y + '', index);
      index = index + 1;
    });

    const dataByYears = _.groupBy(data, (d) => d.year);

    return Object.keys(dataByYears).map((year) => ({
      type: 'heatmap',
      coordinateSystem: 'calendar',
      calendarIndex: indexMap.get(year),
      data: dataByYears[year].map((d) => {
        return [d.date, d.value, d.category];
      }),
      // data: dataByYears[year].map(d => [d.date, d.value])
    }));

    // _.forEach(data, d => {
    //   _.forEach(indexMap, iM => {
    //     if (d.year === iM.year) {
    //       series.push({ type: 'heatmap', coordinateSystem: 'calendar', calendarIndex: iM.calendarIndex, data: [[d.date, d.value, d.category]] })
    //     }
    //   })
    // })
  }
}
