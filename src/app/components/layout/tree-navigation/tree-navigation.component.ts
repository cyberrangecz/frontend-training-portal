import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {MatTreeNestedDataSource} from '@angular/material';
import {MenuNode} from '../../../model/menu/menu-node';
import {TreeMenu} from '../../../model/menu/tree-menu';
import {User} from 'kypo2-auth';

@Component({
  selector: 'kypo2-tree-navigation',
  templateUrl: './tree-navigation.component.html',
  styleUrls: ['./tree-navigation.component.scss']
})
/**
 * Tree navigation menu
 */
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
