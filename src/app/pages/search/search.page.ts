import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  items = [];

  constructor() { }

  ngOnInit() {
    this.initItems();
  }

  initItems() {
    this.items = ["Lime", "Quince", "Tangelo", "Banana", "Pineapple", "Grape", "Grapefruit", "Coconut", "Strawberry", "Orange"];
  }

  search(event) {
    this.initItems();
    const val = event.target.value;

    if(val && val.trim() !== '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }

}
