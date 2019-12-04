import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {map, takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Kypo2Table, LoadTableEvent} from 'kypo2-table';
import {SandboxInstanceResource} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';
import {SandboxInstanceResourceService} from '../../../services/sandbox-instance/sandbox/sandbox-instance-resource.service';
import {SandboxInstanceResourceTableCreator} from '../../../model/table/factory/sandbox-instance-resource-table-creator';

@Component({
  selector: 'kypo2-sandbox-instance-detail',
  templateUrl: './sandbox-instance-detail.component.html',
  styleUrls: ['./sandbox-instance-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxInstanceDetailComponent extends BaseComponent implements OnInit {

  sandboxInstance: SandboxInstance;
  resources$: Observable<Kypo2Table<SandboxInstanceResource>>;
  resourcesHasError$: Observable<boolean>;

  constructor(private activeRoute: ActivatedRoute,
              private resourceService: SandboxInstanceResourceService) {
    super();
  }

  ngOnInit() {
    this.initTable();
  }

  onResourceLoadEvent(event: LoadTableEvent = null) {
    this.resourceService.getAll(this.sandboxInstance.id)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  private initTable() {
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(data => {
        this.sandboxInstance = data.sandboxInstance;
        this.onResourceLoadEvent();
      }
    );

    this.resources$ = this.resourceService.resources$.pipe(
      map(resources => SandboxInstanceResourceTableCreator.create(resources))
    );
    this.resourcesHasError$ = this.resourceService.hasError$;
  }
}
