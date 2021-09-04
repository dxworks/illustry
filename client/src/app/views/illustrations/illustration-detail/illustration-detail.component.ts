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
  id = '';
  illId = '';
  currentIllustration:Illustration = {
    _id :'',
    IllustrationName: '',
    IllustrationData: [],
    IllustrationType: ''
  }
  constructor(private illustrationService: IllustrationService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.route.parent.snapshot.paramMap.get('id');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.illId = params['illId'];
          this.illustrationService.getIllustration(this.id,this.illId)
            .subscribe(illustration => {
                this.currentIllustration = illustration;
              },
              error => {throw Error(error)}
            )
        }
      );
  }

  deleteIllustration() {
    this.illustrationService.deleteIllustration(this.id,this.illId).subscribe(()=>console.log(this.illId),error => {throw Error(error)})
  }

  updateIllustration() {
    this.router.navigate([`projects/${this.id}/illustrations/${this.illId}/update`])
  }

  showIllustration() {
    this.router.navigate([`projects/${this.id}/illustrations/${this.illId}/illustration`])
  }
}
