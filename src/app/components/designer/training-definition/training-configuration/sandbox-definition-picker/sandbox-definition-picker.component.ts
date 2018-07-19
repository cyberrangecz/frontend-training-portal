import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MatListOption, MatSelectionList} from "@angular/material";
import {SandboxDefinition} from "../../../../../model/sandbox/sandbox-definition";
import {Observable} from "rxjs/internal/Observable";
import {SandboxDefinitionGetterService} from "../../../../../services/data-getters/sandbox-definition-getter.service";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-sandbox-definition-picker',
  templateUrl: './sandbox-definition-picker.component.html',
  styleUrls: ['./sandbox-definition-picker.component.css']
})
export class SandboxDefinitionPickerComponent implements OnInit {

  sandboxDefs$: Observable<SandboxDefinition[]>;
  selectedSandboxDefs: SandboxDefinition[];

  @ViewChild(MatSelectionList) sandboxDefsList: MatSelectionList;

  constructor(
    public dialogRef: MatDialogRef<SandboxDefinitionPickerComponent>,
    private sandboxDefinitionGetter: SandboxDefinitionGetterService) {

  }

  ngOnInit() {
    this.sandboxDefsList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.sandboxDefs$ = this.sandboxDefinitionGetter.getSandboxDefs();
  }

  confirm() {
    const result = {
      type: 'confirm',
      sandboxDef: this.selectedSandboxDefs[0]
    };
    this.dialogRef.close(result);
  }

  cancel() {
    const result = {
      type: 'cancel',
      sandboxDef: null
    };
    this.dialogRef.close(result);
  }

}
