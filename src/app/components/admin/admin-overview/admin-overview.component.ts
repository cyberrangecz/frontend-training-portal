import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../../base.component";
import {AlertService} from "../../../services/shared/alert.service";
import {takeWhile} from "rxjs/operators";
import {Kypo2UserAndGroupNotificationService} from "kypo2-user-and-group-management";

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css']
})
export class AdminOverviewComponent extends BaseComponent implements OnInit {

  navLinks = [];

  constructor(private adminNotificationService: Kypo2UserAndGroupNotificationService,
              private alertService: AlertService) {
    super();
    this.adminNotificationService.notification$
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe(notification => this.alertService.emitAlert(notification.type, notification.message));
  }

  ngOnInit() {
    this.navLinks = [
      {
        path: 'user',
        label: 'User',
      },
      {
        path: 'group',
        label: 'Group',
      }
    ];
  }
}
