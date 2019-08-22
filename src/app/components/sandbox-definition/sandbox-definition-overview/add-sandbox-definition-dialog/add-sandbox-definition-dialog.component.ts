import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {AlertService} from "../../../../services/shared/alert.service";
import {ErrorHandlerService} from "../../../../services/shared/error-handler.service";
import {SandboxDefinitionFacade} from "../../../../services/facades/sandbox-definition-facade.service";
import {AlertTypeEnum} from "../../../../model/enums/alert-type.enum";
import {BaseComponent} from "../../../base.component";
import {takeWhile} from "rxjs/operators";
import { SandboxDefinitionFormGroup } from './add-sandbox-definition-dialog-form-group';

@Component({
  selector: 'app-add-sandbox-definition-dialog',
  templateUrl: './add-sandbox-definition-dialog.component.html',
  styleUrls: ['./add-sandbox-definition-dialog.component.css']
})
export class AddSandboxDefinitionDialogComponent extends BaseComponent implements OnInit {

  sandboxDefinitionFormGroup: SandboxDefinitionFormGroup;

  constructor(public dialogRef: MatDialogRef<AddSandboxDefinitionDialogComponent>,
              private errorHandler: ErrorHandlerService,
              private alertService: AlertService,
              private sandboxDefinitionFacade: SandboxDefinitionFacade) {
    super();
  }

  ngOnInit() {
    this.sandboxDefinitionFormGroup = new SandboxDefinitionFormGroup();
  }

  get gitlabUrl(){return this.sandboxDefinitionFormGroup.gitlabUrl}
  get revision(){return this.sandboxDefinitionFormGroup.revision}

  add() {
    if (this.sandboxDefinitionFormGroup.gitlabUrl.valid) {
      this.sandboxDefinitionFacade.addSandboxDefinition(this.gitlabUrl.value, this.revision.value)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(
          result => this.dialogRef.close({ type: 'success' }),
          err => this.errorHandler.displayInAlert(err, 'Uploading sandbox definition')
        )
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
