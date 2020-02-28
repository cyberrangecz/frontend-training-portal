import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {SandboxDefinitionFormGroup} from './create-sandbox-definition-dialog-form-group';
import {SandboxDefinitionOverviewService} from '../../../services/sandbox-definition/sandbox-definition-overview.service';
import {SandboxDefinitionCreateInfo} from '../../../model/sandbox/definition/sandbox-definition-create-info';
import {takeWhile} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RouteFactory} from '../../../model/routes/route-factory';
import {SandboxDefinitionDetailService} from '../../../services/sandbox-definition/detail/sandbox-definition-detail.service';

/**
 * Component with form for creating new sandbox definition
 */
@Component({
  selector: 'kypo2-create-sandbox-definition',
  templateUrl: './create-sandbox-definition.component.html',
  styleUrls: ['./create-sandbox-definition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSandboxDefinitionComponent extends BaseComponent implements OnInit {

  sandboxDefinitionFormGroup: SandboxDefinitionFormGroup;

  constructor(private sandboxDefinitionService: SandboxDefinitionDetailService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.sandboxDefinitionFormGroup = new SandboxDefinitionFormGroup();
  }

  get gitlabUrl() {return this.sandboxDefinitionFormGroup.formGroup.get('gitlabUrl'); }

  get revision() {return this.sandboxDefinitionFormGroup.formGroup.get('revision'); }


  /**
   * Calls service to create sandbox definition and in case of success navigates to the sandbox definition overview path
   */
  create() {
    this.sandboxDefinitionService.create(new SandboxDefinitionCreateInfo(this.gitlabUrl.value, this.revision.value))
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe();
  }

}
