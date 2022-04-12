import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.css']
})
export class IllustrationComponent implements OnInit {

  @Input()
  illustration: any

  constructor() { }

  ngOnInit(): void {
  }

}
