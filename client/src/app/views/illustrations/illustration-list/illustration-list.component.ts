import {Component, Input, OnInit, Output} from '@angular/core';
import {Illustration} from "../../../../types/illustration.model";
import {IllustrationService} from "../../../services/illustration.service";

@Component({
  selector: 'app-illustration-list',
  templateUrl: './illustration-list.component.html',
  styleUrls: ['./illustration-list.component.css']
})
export class IllustrationListComponent implements OnInit {
  @Input()
  id: string = '';

  illustrations: Illustration[] = [];
  constructor(private illustrationService: IllustrationService) { }

  ngOnInit(): void {
    console.log(this.id)
    this.illustrationService.getAllIllustrations(this.id).subscribe((illustrations: Illustration[]) => {console.log(illustrations); this.illustrations = illustrations});
  }

}
