import {Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {SandboxDefinition} from "../../../../../model/sandbox/definition/sandbox-definition";
import {SandboxDefinitionFacade} from "../../../../../services/facades/sandbox-definition-facade.service";
import {BaseComponent} from "../../../../base.component";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-sandbox-definition-picker',
  templateUrl: './sandbox-definition-picker.component.html',
  styleUrls: ['./sandbox-definition-picker.component.css']
})
/**
 * Component of sandbox definition picker dialog window. Lets the user to choose from list of sandbox definitions which will be associated with the training definition
 */
export class SandboxDefinitionPickerComponent extends BaseComponent implements OnInit {

  sandboxDefs: SandboxDefinition[];
  selectedSandboxDef: SandboxDefinition;
  isLoading = true;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: number,
              public dialogRef: MatDialogRef<SandboxDefinitionPickerComponent>,
              private sandboxDefinitionFacade: SandboxDefinitionFacade) {
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
   * Closes the dialog window and passes the selected option to its parent component
   */
  confirm() {
    const result = {
      type: 'confirm',
      sandboxDef: this.selectedSandboxDef
    };
    this.dialogRef.close(result);
  }

  /**
   * Closes the dialog window without passing the selected option
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
