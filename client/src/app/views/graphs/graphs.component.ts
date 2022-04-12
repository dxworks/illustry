import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {IllustrationService} from "../../services/illustration.service";


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphsComponent implements OnInit {
  projectName = "";
  illustrationName = "";
  currentIllustrations: any[] = []
  selectedIndex = 0;
  private graphType: any;

  constructor(private illustrationService: IllustrationService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.projectName = params['projectName'];
          this.illustrationName = params['illustrationName'];
          this.illustrationService.getIllustrations(this.projectName, this.illustrationName)
            .subscribe(illustrations => {
                this.currentIllustrations = illustrations;
                this.handleQueryParam();
              },
              error => {
                throw Error(error)
              })
        });

    this.route.queryParams.subscribe(
      (query) => {
        this.graphType = query?.type;
      }
    )
  }

  handleQueryParam() {
    this.selectedIndex = this.currentIllustrations.findIndex(ill => ill.Type === this.graphType) || 0;
  }


  selectTab(index: number) {
    this.selectedIndex = index
    this.graphType = this.currentIllustrations[index].Type
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {type: this.graphType},
      queryParamsHandling: 'merge'
    })
  }
}
