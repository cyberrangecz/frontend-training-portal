import {Component, Input, OnInit} from '@angular/core';
import {SandboxDefinition} from '../../../../model/sandbox/definition/sandbox-definition';

/**
 * Table detail of expanded row displaying sandbox definition details
 */
@Component({
  selector: 'kypo2-sandbox-definition-table-detail',
  templateUrl: './sandbox-definition-detail.component.html',
  styleUrls: ['./sandbox-definition-detail.component.scss']
})
export class SandboxDefinitionDetailComponent implements OnInit {

  @Input() data: SandboxDefinition;

  constructor() { }

  ngOnInit() {
  }

}
