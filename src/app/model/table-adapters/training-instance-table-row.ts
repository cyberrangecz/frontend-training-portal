import {Observable} from 'rxjs';
import {RouteFactory} from '../routes/route-factory';
import {SandboxInstanceAllocationState} from '../training/sandbox-instance-allocation-state';
import {TrainingInstance} from '../training/training-instance';
import {StringNormalizer} from '../utils/ignore-diacritics-filter';
import {TableRowAdapter} from './table-row-adapter';

export class TrainingInstanceTableRow implements TableRowAdapter {
  trainingDefinitionTitle: string;
  detailRouterLink: string;
  isAllocationInProgress: boolean;
  isAllocationFailed: boolean;
  allocatedSandboxesCount: number;
  failedSandboxesCount: number;
  areSandboxDataLoaded: boolean;
  trainingInstance: TrainingInstance;
  allocation$: Observable<SandboxInstanceAllocationState>;
  normalizedTitle: string;

  constructor(trainingInstance: TrainingInstance) {
    this.trainingInstance = trainingInstance;
    this.detailRouterLink = RouteFactory.toTrainingInstanceDetail(trainingInstance.id);
    this. trainingDefinitionTitle = this.trainingInstance.trainingDefinition.title;
    this.isAllocationInProgress = false;
    this.allocatedSandboxesCount = 0;
    this.failedSandboxesCount = 0;
    this.normalizedTitle = StringNormalizer.normalizeDiacritics(this.trainingInstance.title).toLowerCase();
  }
}
