import {Component, Input, OnInit} from '@angular/core';
import {Illustration} from "../../../../../types/illustration.model";

@Component({
  selector: 'app-illustration-item',
  templateUrl: './illustration-item.component.html',
  styleUrls: ['./illustration-item.component.css']
})
export class IllustrationItemComponent implements OnInit {
  @Input()
  illustration: Illustration = <Illustration>{};
  @Input()
  illustrationName: string = "";

  constructor() { }

  ngOnInit(): void {

  }

}
