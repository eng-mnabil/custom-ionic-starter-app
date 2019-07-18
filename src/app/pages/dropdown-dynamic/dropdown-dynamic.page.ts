import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../../services/endpoints.service';

@Component({
  selector: 'app-dropdown-dynamic',
  templateUrl: './dropdown-dynamic.page.html',
  styleUrls: ['./dropdown-dynamic.page.scss'],
})
export class DropdownDynamicPage implements OnInit {
  colors;

  constructor(
    private server: EndpointsService
  ) { }

  ngOnInit() {
    this.server.getColors().subscribe(result => {
      this.colors = result[0];
    })
  }

}
