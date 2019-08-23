import { Component, Input, OnInit } from '@angular/core';

import { MilitaryMedal } from './../../models/military.model';

@Component({
  selector: 'app-ribbon-board',
  templateUrl: './ribbon-board.component.html',
  styleUrls: ['./ribbon-board.component.scss']
})
export class RibbonBoardComponent implements OnInit {

  @Input() medals: MilitaryMedal[];

  constructor() { }

  ngOnInit() {
  }

}
