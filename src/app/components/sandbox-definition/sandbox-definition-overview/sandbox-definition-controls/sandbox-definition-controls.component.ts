import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'kypo2-sandbox-definition-controls',
  templateUrl: './sandbox-definition-controls.component.html',
  styleUrls: ['./sandbox-definition-controls.component.scss']
})
export class SandboxDefinitionControlsComponent extends BaseComponent implements OnInit {

  @Output() dialogSandboxDefinition = new EventEmitter();

  constructor() { super(); }

  ngOnInit() {
  }

  addSandboxDefinition() {
    this.dialogSandboxDefinition.emit();
  }
}
