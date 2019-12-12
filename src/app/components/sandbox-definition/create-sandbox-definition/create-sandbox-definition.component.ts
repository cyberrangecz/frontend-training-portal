import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {SandboxDefinitionFormGroup} from './create-sandbox-definition-dialog-form-group';
import {SandboxDefinitionService} from '../../../services/shared/sandbox-definition.service';
import {SandboxDefinitionInfo} from './sandbox-definition-info';
import {takeWhile} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RouteFactory} from '../../../model/routes/route-factory';

@Component({
  selector: 'kypo2-create-sandbox-definition',
  templateUrl: './create-sandbox-definition.component.html',
  styleUrls: ['./create-sandbox-definition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Contains form for creating new sandbox definition
 */
export class CreateSandboxDefinitionComponent extends BaseComponent implements OnInit {

  sandboxDefinitionFormGroup: SandboxDefinitionFormGroup;

  constructor(private sandboxDefinitionService: SandboxDefinitionService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.sandboxDefinitionFormGroup = new SandboxDefinitionFormGroup();
  }

  get gitlabUrl() {return this.sandboxDefinitionFormGroup.formGroup.get('gitlabUrl'); }

  get revision() {return this.sandboxDefinitionFormGroup.formGroup.get('revision'); }


  create() {
    this.sandboxDefinitionService.create(new SandboxDefinitionInfo(this.gitlabUrl.value, this.revision.value))
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe(_ => this.router.navigate(['/', RouteFactory.toSandboxDefinitionOverview()]));
  }

}
