import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {AlertService} from "../../../../../services/shared/alert.service";
import {ErrorHandlerService} from "../../../../../services/shared/error-handler.service";
import {SandboxDefinitionFacade} from "../../../../../services/facades/sandbox-definition-facade.service";
import {AlertTypeEnum} from "../../../../../model/enums/alert-type.enum";

@Component({
  selector: 'app-add-sandbox-definition-dialog',
  templateUrl: './add-sandbox-definition-dialog.component.html',
  styleUrls: ['./add-sandbox-definition-dialog.component.css']
})
export class AddSandboxDefinitionDialogComponent implements OnInit {

  gitlabUrl: string;
  revision: string;

  constructor(public dialogRef: MatDialogRef<AddSandboxDefinitionDialogComponent>,
              private errorHandler: ErrorHandlerService,
              private alertService: AlertService,
              private sandboxDefinitionFacade: SandboxDefinitionFacade) { }

  ngOnInit() {
  }

  add() {
    if (this.validateInput()) {
      this.sandboxDefinitionFacade.addSandboxDefinition(this.gitlabUrl, this.revision)
        .subscribe(
          result => this.dialogRef.close({ type: 'success' }),
          err => this.errorHandler.displayInAlert(err, 'Uploading sandbox definition')
        )
    }
  }

  private validateInput(): boolean {
    let errorMessage: string = '';

    if (!this.gitlabUrl || this.gitlabUrl.replace(/\s/g, '') === '') {
      errorMessage += 'Gitlab URL cannot be empty\n'
    }

    if (!this.revision || this.revision.replace(/\s/g, '') === '') {
      errorMessage += 'Revision cannot be empty\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }

  cancel() {
    this.dialogRef.close();
  }

}
