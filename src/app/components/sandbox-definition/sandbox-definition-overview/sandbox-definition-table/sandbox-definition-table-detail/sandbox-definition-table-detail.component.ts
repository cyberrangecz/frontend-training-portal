import {Component, Input, OnInit} from '@angular/core';
import {SandboxDefinitionTableRow} from '../../../../../model/table-adapters/sandbox-definition-table-row';

@Component({
  selector: 'kypo2-sandbox-definition-table-detail',
  templateUrl: './sandbox-definition-table-detail.component.html',
  styleUrls: ['./sandbox-definition-table-detail.component.scss']
})
export class SandboxDefinitionTableDetailComponent implements OnInit {

  @Input() sandboxDefinition: SandboxDefinitionTableRow;

  constructor() { }

  ngOnInit() {
  }

}
