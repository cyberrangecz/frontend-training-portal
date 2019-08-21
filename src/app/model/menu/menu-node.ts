export class MenuNode {

  constructor(parent: MenuNode, label: string) {
    this.parent = parent;
    this.label = label;
    this.children = [];
  }

  parent: MenuNode;
  label: string;
  path?: string;
  icon?: string;
  order?: number;
  expandable?: boolean;
  expandedManually?: boolean;
  children?: MenuNode[];

  hasChild(): boolean {
    return this.expandable && this.children.length > 0;
  }
}
