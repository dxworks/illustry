import { Injectable } from '@angular/core';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
@Injectable({ providedIn: 'root' })
export class EchartService {
  public createChart(data: any, chart: any) {
    data.series?.forEach((s: any) => {
      if (s.type === 'wordCloud') {
        if (s.maskImage) {
          var image = new Image();
          image.src = s.maskImage;
          s.maskImage = image;
        }
      }
    });
    var chartDom = document.getElementById('main')!;
    chart = echarts.getInstanceByDom(chartDom);
    chart = echarts.init(chartDom);
    return data && chart.setOption(data);
  }

  public destroyChart() {
    echarts.disconnect;
  }
}
