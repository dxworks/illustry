
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { Chart } from 'src/app/entities/common-types';
import * as echarts from 'echarts';

import { VerticalStackedChartsTypes } from "../../../entities/vertical-stackedchart-types";

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.css']
})


export class StackedChartComponent implements OnInit, OnDestroy {
  @Input()
  data: VerticalStackedChartsTypes | undefined;
  color: any;
  @Output()
  option!: echarts.EChartsOption;
  constructor() {
  }

  ngOnInit(): void {
    if (this.data) {
      //@ts-ignore
      this.createStacked(this.data, this.data.maxDomainInterval, this.data.minDomainInterval, this.data.step)
    }
  }
  ngOnDestroy(): void {
    echarts.disconnect
  }

  private createStacked(data: VerticalStackedChartsTypes, domainMax: number, domainMin: number, step: number) {

    var chartDom = document.getElementById('main')!;
    this.option = {
      tooltip: {

        axisPointer: {
          type: 'shadow'
        },
        //@ts-ignore
        formatter: function (params) {
          //@ts-ignore
          return params.data.prop
        }
      },
      legend: { top: 30 },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },

      animation: true,

      animationThreshold: 2000,
      animationDuration: function (idx) {
        // delay for later data is larger
        return idx * 100;
      },
      xAxis: [
        {
          type: 'category',
          data: Array.from(data.chart.map((d: any) => { return d.group })),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [this.createyAxis(data.chart, domainMax, domainMin, step)],
      series: this.createData(data)
    };
    var myChart = echarts.getInstanceByDom(chartDom)
    if (myChart === null) {
      myChart = echarts.init(chartDom);
      this.option && myChart.setOption(this.option);
    }
  }
  createData(data: VerticalStackedChartsTypes) {
    let finalResult: any[] = []
    _.forEach(data.chart, (ch, chIndex) => {
      _.forEach(Object.keys(ch), och => {
        if (och != "group")
          finalResult.push({
            name: och, type: "bar", stack: 'total', label: {
              show: true
            },

            emphasis: {
              focus: 'series'
            },

            data: this.verifyNumberOrObj(ch[och], chIndex),
          })
      })

    })
    return finalResult
  }
  verifyNumberOrObj(data: any, chIndex: number) {
    let finalData: any[] = []
    while (chIndex > 0) {
      finalData.push({})
      chIndex--
    }

    if (typeof data === 'object') {
      finalData.push({ value: data.value, prop: this.createPropertiesForToolTip(data.properties, data.value) });
    }
    else
      if (typeof data === 'number') {
        finalData.push({ value: data, prop: this.createPropertiesForToolTip(null, data) })
      }
    return finalData

  }
  createyAxis(chart: any[], max: number, min: number, interval: number) {
    let finalResult: any = {
      type: 'value'
    }
    if (max && min) {
      finalResult.max = max
      finalResult.min = min
    }
    else {
      if (max && !min) {
        finalResult.max = max
        finalResult.min = chart.sort((a: any, b: any) => a.value - b.value)[0].value;;
      }
      else {
        if (min && !max) {
          finalResult.min = min
          finalResult.max = chart.sort((a: any, b: any) => b.value - a.value)[0].value;
        }
      }
    }
    if (interval) {
      finalResult.interval = interval;
    }
    return finalResult
  }
  createPropertiesForToolTip(properties: any | string, value?: number) {
    let prop: string = ""
    if (typeof properties === 'object') {
      _.each(properties, (value, key) => {
        prop = prop + `<div style = "font-weight: bold">${key}:${value}`;
      })
      if (value) {
        prop = prop + `<div style = "font-weight: bold">value:${value}</div>`
      }
      return prop
    }
    else {
      if (typeof properties === 'string') {
        if (value) {
          prop = prop + properties + `<div style = "font-weight: bold">value:${value}</div>`
          return properties
        }
        else {
          return properties
        }
      }
      else {
        if (value) {
          return `<div style = "font-weight: bold">value:${value}</div>`
        }
        else {
          return ""
        }
      }
    }
  }
}

