import {NavBuilder} from './nav-builder';
import {User, UserRole} from 'kypo2-auth';
import {TRAINING_DEFINITION_PATH} from 'kypo-training-agenda';

describe('NavBuilder', () => {
  it('should create training definition agenda', () => {
    const designerRole = new UserRole();
    designerRole.roleType = 'ROLE_TRAINING_DESIGNER';
    const user = new User([designerRole])
    const agendaContainers = NavBuilder.build(user)
    expect(agendaContainers[0].agendas[0].path).toBe(TRAINING_DEFINITION_PATH)
  });

})
