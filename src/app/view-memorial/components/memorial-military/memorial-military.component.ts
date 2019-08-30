import { Component, Input, OnInit } from '@angular/core';
import { MilitaryHistory } from '@shared/models/military.model';

@Component({
  selector: 'app-memorial-military',
  templateUrl: './memorial-military.component.html',
  styleUrls: ['./memorial-military.component.scss']
})
export class MemorialMilitaryComponent implements OnInit {

  @Input() history: MilitaryHistory[];

  constructor() { }

  ngOnInit() {
  }

}
