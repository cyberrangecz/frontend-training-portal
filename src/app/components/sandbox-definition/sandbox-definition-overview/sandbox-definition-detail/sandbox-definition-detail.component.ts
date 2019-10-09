import {Component, Input, OnInit} from '@angular/core';
import {SandboxDefinitionTableRow} from '../../../../model/table-adapters/sandbox-definition-table-row';

@Component({
  selector: 'kypo2-sandbox-definition-table-detail',
  templateUrl: './sandbox-definition-detail.component.html',
  styleUrls: ['./sandbox-definition-detail.component.scss']
})
export class SandboxDefinitionDetailComponent implements OnInit {

  @Input() data: SandboxDefinitionTableRow;

  constructor() { }

  ngOnInit() {
  }

}
