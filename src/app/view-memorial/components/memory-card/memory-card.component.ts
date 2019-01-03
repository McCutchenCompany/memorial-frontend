import { Component, Input, OnInit } from '@angular/core';
import { Memory } from '@shared/models/memory.model';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})
export class MemoryCardComponent implements OnInit {

  @Input() memory: Memory;
  @Input() public: boolean;
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
