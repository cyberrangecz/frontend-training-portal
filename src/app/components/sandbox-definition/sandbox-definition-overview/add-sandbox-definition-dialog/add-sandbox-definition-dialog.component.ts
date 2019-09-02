import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AlertService} from '../../../../services/shared/alert.service';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';
import {SandboxDefinitionFacade} from '../../../../services/facades/sandbox-definition-facade.service';
import {BaseComponent} from '../../../base.component';
import {takeWhile} from 'rxjs/operators';
import { SandboxDefinitionFormGroup } from './add-sandbox-definition-dialog-form-group';

@Component({
  selector: 'kypo2-add-sandbox-definition-dialog',
  templateUrl: './add-sandbox-definition-dialog.component.html',
  styleUrls: ['./add-sandbox-definition-dialog.component.css']
})
/**
 * Displays form for creating new sandbox definition in modal
 */
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

  get gitlabUrl() {return this.sandboxDefinitionFormGroup.formGroup.get('gitlabUrl'); }
  get revision() {return this.sandboxDefinitionFormGroup.formGroup.get('revision'); }

  add() {
    if (this.sandboxDefinitionFormGroup.formGroup.valid) {
      this.sandboxDefinitionFacade.addSandboxDefinition(this.gitlabUrl.value, this.revision.value)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(
          result => this.dialogRef.close({ type: 'success' }),
          err => this.errorHandler.displayInAlert(err, 'Uploading sandbox definition')
        );
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
