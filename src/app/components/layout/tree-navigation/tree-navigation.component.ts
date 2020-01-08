import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material';
import {User} from 'kypo2-auth';
import {MenuNode} from '../../../model/menu/menu-node';
import {TreeMenu} from '../../../model/menu/tree-menu';
import {BaseComponent} from '../../base.component';

/**
 * Component of sidebar navigation menu. Displays main agendas and pages in tree-like hierarchical structure
 */
@Component({
  selector: 'kypo2-tree-navigation',
  templateUrl: './tree-navigation.component.html',
  styleUrls: ['./tree-navigation.component.scss']
})
export class TreeNavigationComponent extends BaseComponent implements OnInit, OnChanges {
  /**
   * Logged in user
   */
  @Input() user: User;

  dataSource = new MatTreeNestedDataSource<MenuNode>();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('user' in changes && this.user) {
      this.dataSource.data = TreeMenu.create(this.user);
    }
  }
}
