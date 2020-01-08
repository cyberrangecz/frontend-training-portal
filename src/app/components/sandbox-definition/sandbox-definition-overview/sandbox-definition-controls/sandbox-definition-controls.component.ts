import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../../../base.component';

/**
 * Contens control bar with possible actions on sandbox definition overview page
 */
@Component({
  selector: 'kypo2-sandbox-definition-controls',
  templateUrl: './sandbox-definition-controls.component.html',
  styleUrls: ['./sandbox-definition-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxDefinitionControlsComponent extends BaseComponent implements OnInit {

  @Output() create = new EventEmitter();

  constructor() { super(); }

  ngOnInit() {
  }

  /**
   * Emits event that add button was clicked
   */
  addSandboxDefinition() {
    this.create.emit();
  }
}
