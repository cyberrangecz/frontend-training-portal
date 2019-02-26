import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MatListOption, MatSelectionList} from "@angular/material";
import {SandboxDefinition} from "../../../../../model/sandbox/sandbox-definition";
import {Observable} from "rxjs/internal/Observable";
import {SandboxDefinitionFacade} from "../../../../../services/facades/sandbox-definition-facade.service";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-sandbox-definition-picker',
  templateUrl: './sandbox-definition-picker.component.html',
  styleUrls: ['./sandbox-definition-picker.component.css']
})
/**
 * Component of sandbox definition picker dialog window. Lets the user to choose from list of sandbox definitions which will be associated with the training definition
 */
export class SandboxDefinitionPickerComponent implements OnInit {

  sandboxDefs$: Observable<SandboxDefinition[]>;
  selectedSandboxDef: SandboxDefinition;

  @ViewChild(MatSelectionList) sandboxDefsList: MatSelectionList;

  constructor(
    public dialogRef: MatDialogRef<SandboxDefinitionPickerComponent>,
    private sandboxDefinitionFacade: SandboxDefinitionFacade) {
  }

  ngOnInit() {
    this.sandboxDefsList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.sandboxDefs$ = this.sandboxDefinitionFacade.getSandboxDefs();
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

}
