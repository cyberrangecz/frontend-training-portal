import {Injectable} from "@angular/core";
import {AlertService} from "./event-services/alert.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertTypeEnum} from "../enums/alert-type.enum";

@Injectable()
export class ComponentErrorHandlerService {
  constructor(private alertService: AlertService) {
  }

  displayHttpError(err: HttpErrorResponse, operation: string) {
    this.alertService.emitAlert(AlertTypeEnum.Error, operation + ' failed with following message: ' + err.message);
  }
}
