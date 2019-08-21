import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {MatTreeNestedDataSource} from '@angular/material';
import {MenuNode} from '../../../model/menu/menu-node';
import {NestedTreeControl} from '@angular/cdk/tree';
import {TreeMenu} from '../../../model/menu/tree-menu';
import {User} from 'kypo2-auth';
import {NavigationEnd, Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'kypo2-tree-navigation',
  templateUrl: './tree-navigation.component.html',
  styleUrls: ['./tree-navigation.component.css']
})
export class TreeNavigationComponent extends BaseComponent implements OnInit, OnChanges {
  treeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();
  @Input() user: User;

  constructor(private router: Router) {
    super();
    this.subscribeNavigationChanges();
  }

  hasChild = (_: number, node: MenuNode) => node.hasChild();

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('user' in changes && this.user) {
      this.dataSource.data = TreeMenu.create(this.user);
      this.expandByUrl(this.dataSource.data, this.router.url);
    }
  }

  toggleManually(node: MenuNode) {
    node.expandedManually = !node.expandedManually;
  }

  private subscribeNavigationChanges() {
    this.router.events
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.expandByUrl(this.dataSource.data, this.router.url);
        }
      });
  }

  private expandByUrl(tree: MenuNode[], url: string) {
    tree.forEach(node => {
      if (node.hasChild()) {
        this.expandByUrl(node.children, url);
      }
      if (url.includes(node.path)) {
        this.collapseAllButExpandedByUser();
        this.treeControl.expand(node.parent);
      }
    });
  }

  private collapseAllButExpandedByUser() {
    this.treeControl.collapseAll();
    this.expandAllExpandedByUser(this.dataSource.data);
  }

  private expandAllExpandedByUser(tree: MenuNode[]) {
    tree.forEach(node => {
      if (node.hasChild()) {
        this.expandAllExpandedByUser(node.children);
      }
      if (node.expandedManually) {
        this.treeControl.expand(node);
      }
    });
  }
}
