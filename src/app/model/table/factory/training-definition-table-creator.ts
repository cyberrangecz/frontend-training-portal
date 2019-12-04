import { TrainingDefinitionStateEnum } from '../../enums/training-definition-state.enum';
import { Column, Kypo2Table, Row, RowExpand } from 'kypo2-table';
import { of } from 'rxjs';
import { PaginatedResource } from '../other/paginated-resource';
import { TrainingDefinitionTableRow } from '../row/training-definition-table-row';
import { TrainingDefinitionDetailComponent } from '../../../components/training-definition/training-definition-overview/training-definition-detail/training-definition-detail.component';

export class TrainingDefinitionTableCreator {
  static create(
    resource: PaginatedResource<TrainingDefinitionTableRow[]>
  ): Kypo2Table<TrainingDefinitionTableRow> {
    const baseActions = [
      {
        label: 'Edit',
        icon: 'create',
        color: 'primary',
        tooltip: 'Edit training definition',
        disabled$: of(false)
      },
      {
        label: 'Delete',
        icon: 'delete',
        color: 'warn',
        tooltip: 'Delete training definition',
        disabled$: of(false)
      },
      {
        label: 'Clone',
        icon: 'file_copy',
        color: 'primary',
        tooltip: 'Clone training definition',
        disabled$: of(false)
      },
      {
        label: 'Download',
        icon: 'cloud_download',
        color: 'primary',
        tooltip: 'Download training definition',
        disabled$: of(false)
      },
      {
        label: 'Preview',
        icon: 'remove_red_eye',
        color: 'primary',
        tooltip: 'Preview training run',
        disabled$: of(false)
      }
    ];
    const table = new Kypo2Table<TrainingDefinitionTableRow>(
      resource.elements.map(trainingDef => {
        const actions = Array.from(baseActions);
        switch (trainingDef.state) {
          case TrainingDefinitionStateEnum.Released:
            actions.push(
              {
                label: 'Unrelease',
                icon: 'lock_open',
                color: 'warn',
                tooltip: 'Unrelease training definition',
                disabled$: of(false)
              },
              {
                label: 'Archive',
                icon: 'archive',
                color: 'warn',
                tooltip: 'Archive training definition',
                disabled$: of(false)
              }
            );
            break;
          case TrainingDefinitionStateEnum.Unreleased:
            actions.push({
              label: 'Release',
              icon: 'lock',
              color: 'warn',
              tooltip: 'Release training definition',
              disabled$: of(false)
            });
            break;
          case TrainingDefinitionStateEnum.Archived:
            break;
        }

        return new Row(trainingDef, actions);
      }),
      [
        new Column('id', 'id', true),
        new Column('title', 'title', true),
        new Column('state', 'state', true),
        new Column(
          'estimatedDuration',
          'estimated duration',
          true,
          'estimatedDuration'
        ),
        new Column('lastEditTime', 'last edit', true, 'lastEdited')
      ]
    );
    table.expand = new RowExpand(TrainingDefinitionDetailComponent);
    table.pagination = resource.pagination;
    table.filterLabel = 'Filter by title';
    table.filterable = true;
    table.selectable = false;
    return table;
  }
}
