import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../../services/endpoints.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  fullItems = [];
  filteredItems = [];

  constructor(
    private server: EndpointsService
  ) { }

  ngOnInit() {
    this.initItems();
  }

  initItems() {
    this.server.getColors().subscribe( (result:any) => {
      this.fullItems= this.filteredItems = Object.values(result[0]);
    })
    // this.items = ["Lime", "Quince", "Tangelo", "Banana", "Pineapple", "Grape", "Grapefruit", "Coconut", "Strawberry", "Orange"];
  }

  search(event:any) {
    this.filteredItems = this.fullItems;
    const val = event.target.value;

    if(val && val.trim() !== '') {
      this.filteredItems = this.fullItems.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }

}
