import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { graphviz } from 'd3-graphviz';

import { PluginOutputConverterService } from '../../../services/plugin-output-converter.service';

import { isNullOrUndefined } from "@qntm-code/utils";
import { DotTypes } from "../../../entities/dot-types";
import * as d3 from 'd3';


@Component({
  selector: 'app-dot-graph',
  templateUrl: './dot-graph.component.html',
  styleUrls: ['./dot-graph.component.scss']
})
export class DotGraphComponent implements OnInit, OnDestroy {
  private container: any;

  constructor(private pluginOutputConverter: PluginOutputConverterService, private elementRef: ElementRef) {
  }

  // noinspection TsLint
  private _content = null;

  @Input()
  set content(content: any) {
    const copy: DotTypes | undefined = JSON.parse(JSON.stringify(content));
    const newContent = this.pluginOutputConverter.convertToGraph(copy);

    if (!isNullOrUndefined(copy) && newContent !== this._content) {
      // @ts-ignore
      this._content = newContent;
      // @ts-ignore
      graphviz('#highLevelDiagram').renderDot(this._content);
      this.container = document.getElementById('highLevelDiagram');
    }
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "javascript/worker";
    s.src = "https://unpkg.com/@hpcc-js/wasm/dist/index.min.js";
    this.elementRef.nativeElement.appendChild(s);
  }
  ngOnDestroy(): void {
    console.log("graphviz destroyed")
    d3.select('#highLevelDiagram').remove()
  }


}
