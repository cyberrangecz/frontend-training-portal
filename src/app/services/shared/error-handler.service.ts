import {Injectable} from "@angular/core";
import {AlertService} from "./alert.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertTypeEnum} from "../../model/enums/alert-type.enum";

@Injectable()
export class ErrorHandlerService {
  constructor(private alertService: AlertService) {
  }

  displayHttpError(err: HttpErrorResponse, operation: string) {
    this.alertService.emitAlert(AlertTypeEnum.Error, operation + ' failed with following message: ' + err.error.message);
  }
}
