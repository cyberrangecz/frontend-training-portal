import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {takeWhile} from 'rxjs/operators';
import {SandboxDefinition} from '../../../../../model/sandbox/definition/sandbox-definition';
import {SandboxDefinitionApi} from '../../../../../services/api/sandbox-definition-api.service';
import {KypoBaseComponent} from 'kypo-common';

/**
 * Component of sandbox definition picker dialog window.
 * Lets the user to choose from list of sandbox definitions which should be associated with the training definition
 */
@Component({
  selector: 'kypo2-sandbox-definition-picker',
  templateUrl: './sandbox-definition-picker.component.html',
  styleUrls: ['./sandbox-definition-picker.component.css']
})
export class SandboxDefinitionPickerComponent extends KypoBaseComponent implements OnInit {

  sandboxDefs: SandboxDefinition[];
  selectedSandboxDef: SandboxDefinition;
  isLoading = true;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: number,
              public dialogRef: MatDialogRef<SandboxDefinitionPickerComponent>,
              private sandboxDefinitionFacade: SandboxDefinitionApi) {
    super();
  }

  ngOnInit() {
    this.sandboxDefinitionFacade.getAll()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(sandboxes => {
        this.sandboxDefs = sandboxes;
        if (this.hasInitialSandbox()) {
          this.addPreselectedSandbox(sandboxes);
        }
        this.isLoading = false;
      });
  }

  /**
   * Closes the dialog window with 'confirm' result and selected sandbox definition
   */
  confirm() {
    const result = {
      type: 'confirm',
      sandboxDef: this.selectedSandboxDef
    };
    this.dialogRef.close(result);
  }

  /**
   * Closes the dialog window without result and selected option
   */
  cancel() {
    const result = {
      type: 'cancel',
      sandboxDef: null
    };
    this.dialogRef.close(result);
  }

  private hasInitialSandbox(): boolean {
    return this.data !== null && this.data !== undefined;
  }

  private addPreselectedSandbox(sandboxes: SandboxDefinition[]) {
    const preselected = sandboxes.find(sandbox => sandbox.id == this.data);
    if (preselected) {
      this.selectedSandboxDef = preselected;
    }
  }
}
