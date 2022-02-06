import { Component, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-timeliner',
  templateUrl: './timeliner.component.html',
  styleUrls: ['./timeliner.component.css']
})
export class TimelinerComponent implements OnInit {

  @Input()
  data: any

  @Output()
  dataToBeTransfered: any
  constructor() { }

  ngOnInit(): void {
    this.dataToBeTransfered = this.data
  }
}
