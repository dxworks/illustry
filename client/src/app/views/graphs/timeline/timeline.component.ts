import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TimelineService} from 'src/app/services/timeliner.service';
import {Timeline} from "../../../entities/timeline";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Moment} from "moment";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnChanges {

  @Input()
  data: Timeline = {}
  Object = Object
  projectName = "";
  illustrationName = "";
  expanded: any = {};

  startDate: Moment | null = null;
  endDate: Moment | null = null;
  filter: string = '';

  constructor(private timelineService: TimelineService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("initializing timeline")
    this.route.params
      .subscribe(
        (params: Params) => {
          this.projectName = params['projectName'];
          this.illustrationName = params['illustrationName'];

          this.timelineService.getAppliedTimelineQuery(
            {
              illustrationName: this.illustrationName,
              projectName: this.projectName
            })
            .subscribe(d => this.data = d)
        })
  }


  onStartDateChange(e: MatDatepickerInputEvent<Moment>) {
    this.startDate = e.value;
  }

  onEndDateChange(e: MatDatepickerInputEvent<Moment>) {
    this.endDate = e.value;
  }

  onDatePickerClosed() {
    console.log('Range picker closed')
    this.requestNewData();
  }

  private requestNewData() {
    let timelineQuery = {
      illustrationName: this.illustrationName,
      projectName: this.projectName,
      fromDate: this.startDate?.format("YYYY-MM-DD") ?? "",
      toDate: this.endDate?.format("YYYY-MM-DD") ?? "",
      searchedText: this.filter
    };
    console.log(timelineQuery)
    this.timelineService.getAppliedTimelineQuery(timelineQuery).subscribe(d => this.data = d)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data?.firstChange) {
      Object.keys(this.data)?.forEach(key => {
        this.expanded[key] = {};
      })
    }
  }

  onFilterSubmit() {
    console.log('filtering');
    this.requestNewData();
  }
}
