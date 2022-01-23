import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import * as echarts from 'echarts';
import { HorizontalStackedChartsTypes } from 'src/app/entities/horizontal-stackedchart-types';
@Component({
  selector: 'app-horizontal-stacked-chart',
  templateUrl: './horizontal-stacked-chart.component.html',
  styleUrls: ['./horizontal-stacked-chart.component.css']
})
export class HorizontalStackedChartComponent implements OnInit, OnDestroy {
  @Input()
  data: HorizontalStackedChartsTypes | undefined;
  color: any;
  @Output()
  option!: echarts.EChartsOption;
  constructor() {
    // Chart.register(...registerables)
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
  // private createRandomColor() {
  //   const randomNumber = Math.floor(Math.random() * 122);
  //   const lastNumber = Math.random() * 2;
  //   return `rgb(${randomNumber},${randomNumber},${randomNumber},${lastNumber})`
  // }
  private createStacked(data: HorizontalStackedChartsTypes, domainMax: number, domainMin: number, step: number) {
    //   const labels: string[] = Array.from(new Set(data.chart.map((d: any) => d.group)));
    //   const subgroups: string[] = data.subgroups;
    //   let datasets: any[] = [];
    //   let preFinalDatasets: any[] = [];
    //   let finalDataSets: any[] = []
    //   this.color = d3.scaleOrdinal(d3.schemeCategory10)
    //   subgroups.forEach((subgroup) => { preFinalDatasets.push({ label: subgroup, color: this.color(subgroup) }); datasets[subgroup] = data.chart.map((d: any) => d[subgroup]) })
    //   preFinalDatasets.forEach((fd) => {
    //     finalDataSets.push({ label: fd.label, borderColor: fd.color, backgroundColor: fd.color, data: datasets[fd.label] })
    //   })
    //   //@ts-ignore
    //   var ctx = document.getElementById('myChart').getContext('2d');
    //   const graphdata = {
    //     labels: labels,
    //     datasets: finalDataSets
    //   };

    //   this.chart = new Chart(ctx, {
    //     type: 'bar',
    //     data: graphdata,
    //     options: {
    //       responsive: true,
    //       scales: {
    //         x: {
    //           stacked: true,
    //         },
    //         y: {
    //           stacked: true
    //         }
    //       },
    //     }
    //   })
    // }

    var chartDom = document.getElementById('main')!;
    this.option = {
      tooltip: {

        axisPointer: {
          type: 'shadow'
        },
        //@ts-ignore
        formatter: function (params) {
          //@ts-ignore
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
      yAxis: [
        {
          type: 'category',
          data: Array.from(data.chart.map((d: any) => { return d.group })),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      xAxis: [this.createyAxis(data.chart, domainMax, domainMin, step)],
      series: this.createData(data)
    };
    var myChart = echarts.getInstanceByDom(chartDom)
    if (myChart === null) {
      myChart = echarts.init(chartDom);
      this.option && myChart.setOption(this.option);
    }
  }
  createData(data: HorizontalStackedChartsTypes) {
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
