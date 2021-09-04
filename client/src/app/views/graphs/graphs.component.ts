import { Component, OnInit } from '@angular/core';
import {Illustration} from "../../../types/illustration.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {IllustrationService} from "../../services/illustration.service";

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  illId = "";
  id = "";
  currentIllustration: Illustration = {
    _id: '',
    IllustrationName: '',
    IllustrationData: [],
    IllustrationType: ''
  };

  constructor(private illustrationService: IllustrationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.illId = params['illId'];
          this.id = params['id'];
          this.illustrationService.getIllustration(this.id, this.illId)
            .subscribe(illustration => {
                this.currentIllustration = illustration;
                console.log(this.currentIllustration)
              },
              error => {
                throw Error(error)
              }
            )
        }
      );
  }



}
