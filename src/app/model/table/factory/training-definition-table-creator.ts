import { TrainingDefinitionStateEnum } from '../../enums/training-definition-state.enum';
import { Column, Kypo2Table, Row, RowExpand } from 'kypo2-table';
import { of } from 'rxjs';
import { PaginatedResource } from '../other/paginated-resource';
import { TrainingDefinitionDetailComponent } from '../../../components/training-definition/training-definition-overview/training-definition-detail/training-definition-detail.component';
import {TrainingDefinition} from '../../training/training-definition';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class TrainingDefinitionTableCreator {

  static readonly EDIT_ACTION = 'Edit';
  static readonly DELETE_ACTION = 'Delete';
  static readonly CLONE_ACTION = 'Clone';
  static readonly DOWNLOAD_ACTION = 'Download';
  static readonly PREVIEW_ACTION = 'Preview';
  static readonly RELEASE_ACTION = 'Release';
  static readonly UNRELEASE_ACTION = 'Unrelease';
  static readonly ARCHIVE_ACTION = 'Archive';

  /**
   * Transforming paginated resource to class for common table component
   * @param resource paginated resource to transform
   */
  static create(resource: PaginatedResource<TrainingDefinition[]>): Kypo2Table<TrainingDefinition> {
    const baseActions = [
      {
        label: this.EDIT_ACTION,
        icon: 'create',
        color: 'primary',
        tooltip: 'Edit training definition',
        disabled$: of(false)
      },
      {
        label: this.DELETE_ACTION,
        icon: 'delete',
        color: 'warn',
        tooltip: 'Delete training definition',
        disabled$: of(false)
      },
      {
        label: this.CLONE_ACTION,
        icon: 'file_copy',
        color: 'primary',
        tooltip: 'Clone training definition',
        disabled$: of(false)
      },
      {
        label: this.DOWNLOAD_ACTION,
        icon: 'cloud_download',
        color: 'primary',
        tooltip: 'Download training definition',
        disabled$: of(false)
      },
      {
        label: this.PREVIEW_ACTION,
        icon: 'remove_red_eye',
        color: 'primary',
        tooltip: 'Preview training run',
        disabled$: of(false)
      }
    ];

    const table = new Kypo2Table<TrainingDefinition>(
      resource.elements.map(trainingDef => {
        const actions = Array.from(baseActions);
        switch (trainingDef.state) {
          case TrainingDefinitionStateEnum.Released:
            actions.push(
              {
                label: this.UNRELEASE_ACTION,
                icon: 'lock_open',
                color: 'warn',
                tooltip: 'Unrelease training definition',
                disabled$: of(false)
              },
              {
                label: this.ARCHIVE_ACTION,
                icon: 'archive',
                color: 'warn',
                tooltip: 'Archive training definition',
                disabled$: of(false)
              }
            );
            break;
          case TrainingDefinitionStateEnum.Unreleased:
            actions.push({
              label: this.RELEASE_ACTION,
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
        new Column('estimatedDuration', 'estimated duration', true, 'estimatedDuration'),
        new Column('lastEditTimeFormatted', 'last edit', true, 'lastEdited')
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
