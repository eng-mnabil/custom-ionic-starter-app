import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input("title") title;
  private canGoBack: Boolean;
  private currentUrl: String;
  private PreviousUrl: String;
  private routerEvents: any;

  constructor(
    private router: Router,
    private ionRouterOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
    this.canGoBack = this.ionRouterOutlet.canGoBack();
    this.currentUrl = this.router.url;
    this.routerEvents = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.PreviousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    })
  }

  ngOnDestroy() {
    this.routerEvents.unsubscribe();
  }

}
