import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {ActivatedRoute} from '@angular/router';
import {KypoBaseComponent} from 'kypo-common';
import {map, takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Kypo2Table, LoadTableEvent} from 'kypo2-table';
import {SandboxResource} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-resource';
import {SandboxInstanceResourceService} from '../../../services/sandbox-instance/sandbox/sandbox-instance-resource.service';
import {SandboxInstanceResourceTable} from '../../../model/table/sandbox-instance/sandbox-instance-resource-table';

/**
 * Smart component of sandbox instance detail page
 */
@Component({
  selector: 'kypo2-sandbox-instance-detail',
  templateUrl: './sandbox-instance-detail.component.html',
  styleUrls: ['./sandbox-instance-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxInstanceDetailComponent extends KypoBaseComponent implements OnInit {

  sandboxInstance: SandboxInstance;
  resources$: Observable<Kypo2Table<SandboxResource>>;
  resourcesHasError$: Observable<boolean>;

  constructor(private activeRoute: ActivatedRoute,
              private resourceService: SandboxInstanceResourceService) {
    super();
  }

  ngOnInit() {
    this.initTable();
  }

  /**
   * Gets new data for sandbox instance resource table
   * @param event load data event from sandbox instance resources table
   */
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
      map(resources => new SandboxInstanceResourceTable(resources))
    );
    this.resourcesHasError$ = this.resourceService.hasError$;
  }
}
