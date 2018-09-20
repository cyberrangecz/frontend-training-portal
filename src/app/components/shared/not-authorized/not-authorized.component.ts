import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../enums/alert-type.enum";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'shared-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.css']
})
export class NotAuthorizedComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.emitAlert(AlertTypeEnum.Warning, 'You are not authorized to access requested resource')
  }

}
