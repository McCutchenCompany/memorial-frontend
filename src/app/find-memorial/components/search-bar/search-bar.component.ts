import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() searchQuery: string;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.fb.group({
      query: this.searchQuery
    });
  }

  onSubmit() {
    if (this.searchForm.dirty) {
      this.search.emit(this.searchForm.value);
    }
  }

  clearSearch() {
    this.searchForm.setValue({query: ''});
    this.search.emit(this.searchForm.value);
  }

}
