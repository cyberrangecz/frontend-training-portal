import {Injectable} from "@angular/core";
import {ActiveUserService} from "../active-user.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class TrainingRunSetterService {

  constructor(private activeUser: ActiveUserService) {

  }

  /**
   * Reverts training run
   * @param id id of training run which should be reverted
   */
  revert(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    // TODO: Call REST API to revert training run
  }
}
