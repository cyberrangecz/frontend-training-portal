import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'overview',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  isSidenavOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

}
