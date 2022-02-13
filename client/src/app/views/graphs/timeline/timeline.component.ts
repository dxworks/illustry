import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TimelineService } from 'src/app/services/timeliner.service';
import { TimelineQuery } from 'src/types/timelineQuery';
import { Timeline } from "../../../entities/timeline";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input()
  data?: Timeline = {}
  Object = Object
  projectName = "";
  illustrationName = "";
  actualData: Timeline = {}
  timeLineQuery: TimelineQuery = {
    searchedText: "",
    fromDate: "",
    toDate: ""
  }
  form: FormGroup = new FormGroup({
    searchedText: new FormControl('', []),
    fromDate: new FormControl('', []),
    toDate: new FormControl('', [])
  });
  constructor(private timelineService: TimelineService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.data != undefined) {
      this.actualData = this.data
      this.searchTermListener()
    }
  }

  searchTermListener() {
    const formData: FormData = new FormData()
    this.route.params
      .subscribe(
        (params: Params) => {
          this.projectName = params['projectName'];
          this.illustrationName = params['illustrationName'];
          // formData.append('searchedText', this.form.value.searchedText);
          // formData.append("fromDate", this.form.value.fromDate);
          // formData.append('toDate', this.form.value.toDate);
          formData.append('searchedText', 'com');
          formData.append("fromDate", '2022/2/01');
          // formData.append('toDate', '2022/2/01');
          formData.append('ProjectName', this.projectName);
          formData.append('IllustrationName', this.illustrationName);
          //@ts-ignore
          this.timelineService.getAppliedTimelineQuery(formData).subscribe(d => this.actualData = d)
        })
  }

}
