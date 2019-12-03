import {User, UserRole} from 'kypo2-auth';
import {
  ADMIN_GROUP_PATH, ADMIN_MICROSERVICE_PATH,
  ADMIN_USER_PATH, HOME_PATH,
  SANDBOX_DEFINITION_PATH, SANDBOX_POOL_PATH,
  TRAINING_DEFINITION_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_RUN_PATH
} from '../../paths';
import {MenuNode} from './menu-node';
import {
  ADMIN_NODES_GROUP_ORDER, ADMIN_NODES_MICROSERVICE_ORDER,
  ADMIN_NODES_USER_ORDER,
  DESIGNER_NODES_SD_ORDER,
  DESIGNER_NODES_TD_ORDER,
  ORGANIZER_NODES_TI_ORDER, TRAINEE_NODES_TR_ORDER
} from './tree-menu.constants';

const TRAININGS_LABEL = 'Trainings';
const SANDBOXES_LABEL = 'Sandboxes';
const ADMIN_LABEL = 'Administration';

export class TreeMenu {
  static create(user: User): MenuNode[] {
    let tree = TreeMenu.createTopLevelNodes();
    TreeMenu.addLowerLevelNodes(user.roles, tree);
    tree = TreeMenu.removeEmptyNodes(tree);
    TreeMenu.sortTree(tree);
    return tree;
  }

  private static createTopLevelNodes(): MenuNode[] {
    const topLevel: MenuNode[] = [];
    const home = new MenuNode(null, 'Home');
    home.icon = 'home';
    home.path = HOME_PATH;
    const trainings = new MenuNode(null, TRAININGS_LABEL);
    trainings.expandable = true;
    const sandboxes = new MenuNode(null, SANDBOXES_LABEL);
    sandboxes.expandable = true;
    const admin = new MenuNode(null, ADMIN_LABEL);
    admin.expandable = true;
    topLevel.push(home, trainings, sandboxes, admin);
    return topLevel;
  }

  private static addLowerLevelNodes(roles: UserRole[], tree: MenuNode[]) {
    roles.forEach(role => {
      if (role.isUserAndGroupAdmin()) {
        TreeMenu.AddAdminNodes(tree);
      }
      if (role.isTrainingDesigner()) {
        TreeMenu.AddDesignerNodes(tree);
      }
      if (role.isTrainingOrganizer()) {
        TreeMenu.AddOrganizerNodes(tree);
      }
      if (role.isTrainingTrainee()) {
        TreeMenu.AddTraineeNodes(tree);
      }
    });
  }

  private static AddAdminNodes(tree: MenuNode[]) {
    const parent = tree.find(node => node.label === ADMIN_LABEL);
    const user = new MenuNode(parent, 'User');
    user.path = ADMIN_USER_PATH;
    user.order = ADMIN_NODES_USER_ORDER;
    const group = new MenuNode(parent, 'Group');
    group.path = ADMIN_GROUP_PATH;
    group.order = ADMIN_NODES_GROUP_ORDER;
    const microservice = new MenuNode(parent, 'Microservice');
    microservice.path = ADMIN_MICROSERVICE_PATH;
    microservice.order = ADMIN_NODES_MICROSERVICE_ORDER;
    parent.children.push(user, group, microservice);
  }

  private static AddDesignerNodes(tree: MenuNode[]) {
    let parent = tree.find(node => node.label === TRAININGS_LABEL);
    const trainingDef = new MenuNode(parent, 'Definition');
    trainingDef.path = TRAINING_DEFINITION_PATH;
    trainingDef.order = DESIGNER_NODES_TD_ORDER;
    parent.children.push(trainingDef);

    parent = tree.find(node => node.label === SANDBOXES_LABEL);
    const sandboxDef = new MenuNode(parent, 'Definition');
    sandboxDef.path = SANDBOX_DEFINITION_PATH;
    sandboxDef.order = DESIGNER_NODES_SD_ORDER;
    parent.children.push(sandboxDef);
  }

  private static AddOrganizerNodes(tree: MenuNode[]) {
    let parent = tree.find(node => node.label === TRAININGS_LABEL);
    const trainingInstance = new MenuNode(parent, 'Instance');
    trainingInstance.path = TRAINING_INSTANCE_PATH;
    trainingInstance.order = ORGANIZER_NODES_TI_ORDER;
    parent.children.push(trainingInstance);
    parent = tree.find(node => node.label === SANDBOXES_LABEL);
    const sandboxInstance = new MenuNode(parent, 'Instance');
    sandboxInstance.path = SANDBOX_POOL_PATH;
    sandboxInstance.order = 20;
    parent.children.push(sandboxInstance);
  }

  private static AddTraineeNodes(tree: MenuNode[]) {
    const found = tree.find(node => node.label === TRAININGS_LABEL);
    const trainingRun = new MenuNode(found, 'Run');
    trainingRun.path = TRAINING_RUN_PATH;
    trainingRun.order = TRAINEE_NODES_TR_ORDER;
    found.children.push(trainingRun);
  }

  private static removeEmptyNodes(tree: MenuNode[]): MenuNode[] {
    return tree.filter(node => node.expandable && node.children.length > 0);
  }

  private static sortTree(tree: MenuNode[]) {
    tree.forEach(node => {
      if (node.expandable) {
        node.children = node.children.sort((a, b) => {
          const aOrder = a.order ? a.order : 0;
          const bOrder = b.order ? b.order : 0;
          return aOrder - bOrder;
        });
        node.children.forEach(childNode => {
          if (childNode.expandable) {
            this.sortTree(childNode.children);
          }
        });
      }
    });
    return tree;
  }
}
