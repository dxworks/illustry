import { Component, OnInit } from '@angular/core';
import {Illustration} from "../../../../types/illustration.model";
import {IllustrationService} from "../../../services/illustration.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-illustration-detail',
  templateUrl: './illustration-detail.component.html',
  styleUrls: ['./illustration-detail.component.css']
})
export class IllustrationDetailComponent implements OnInit {
  projectName = '';
  illustrationName = '';
  currentIllustration:Illustration = {
    _id :'',
    IllustrationName: '',
    IllustrationData: [],
    IllustrationType: ''
  }
  constructor(private illustrationService: IllustrationService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    this.projectName = this.route.parent.snapshot.paramMap.get('projectName');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.illustrationName = params['illustrationName'];
          this.illustrationService.getIllustration(this.projectName,this.illustrationName)
            .subscribe(illustration => {
                this.currentIllustration = illustration;
              },
              error => {throw Error(error)}
            )
        }
      );
  }

  deleteIllustration() {
    this.illustrationService.deleteIllustration(this.projectName,this.illustrationName).subscribe(()=>console.log(this.illustrationName),error => {throw Error(error)})
  }

  updateIllustration() {
    this.router.navigate([`projects/${this.projectName}/illustrations/${this.illustrationName}/update`])
  }

  showIllustration() {
    this.router.navigate([`projects/${this.projectName}/illustrations/${this.illustrationName}/illustration`])
  }
}
