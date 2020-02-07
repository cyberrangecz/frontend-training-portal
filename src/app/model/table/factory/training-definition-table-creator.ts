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

  static readonly EDIT_ACTION_ID = 'edit';
  static readonly DELETE_ACTION_ID = 'delete';
  static readonly CLONE_ACTION_ID = 'clone';
  static readonly DOWNLOAD_ACTION_ID = 'download';
  static readonly PREVIEW_ACTION_ID = 'preview';
  static readonly RELEASE_ACTION_ID = 'release';
  static readonly UNRELEASE_ACTION_ID = 'unrelease';
  static readonly ARCHIVE_ACTION_ID = 'archive';

  /**
   * Transforming paginated resource to class for common table component
   * @param resource paginated resource to transform
   */
  static create(resource: PaginatedResource<TrainingDefinition>): Kypo2Table<TrainingDefinition> {
    const baseActions = [
      {
        id: this.EDIT_ACTION_ID,
        label: 'Edit',
        icon: 'create',
        color: 'primary',
        tooltip: 'Edit training definition',
        disabled$: of(false)
      },
      {
        id: this.DELETE_ACTION_ID,
        label: 'Delete',
        icon: 'delete',
        color: 'warn',
        tooltip: 'Delete training definition',
        disabled$: of(false)
      },
      {
        id: this.CLONE_ACTION_ID,
        label: 'Clone',
        icon: 'file_copy',
        color: 'primary',
        tooltip: 'Clone training definition',
        disabled$: of(false)
      },
      {
        id: this.DOWNLOAD_ACTION_ID,
        label: 'Download',
        icon: 'cloud_download',
        color: 'primary',
        tooltip: 'Download training definition',
        disabled$: of(false)
      },
      {
        id: this.PREVIEW_ACTION_ID,
        label: 'Preview',
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
                id: this.UNRELEASE_ACTION_ID,
                label: 'Unrelease',
                icon: 'lock_open',
                color: 'warn',
                tooltip: 'Unrelease training definition',
                disabled$: of(false)
              },
              {
                id: this.ARCHIVE_ACTION_ID,
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
              id: this.RELEASE_ACTION_ID,
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
