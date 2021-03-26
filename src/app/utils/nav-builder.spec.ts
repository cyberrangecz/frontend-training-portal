import { NavBuilder } from './nav-builder';
import { User, UserRole } from '@sentinel/auth';
import { TRAINING_DEFINITION_PATH } from '@muni-kypo-crp/training-agenda';
import { DynamicEnvironment } from '@sentinel/common';

describe('NavBuilder', () => {
  it('should create training definition agenda', () => {
    const designerRoleName = 'TRAINING_DESIGNER';
    spyOn(DynamicEnvironment, 'getConfig').and.returnValue({ roleMapping: { trainingDesigner: designerRoleName } });
    const designerRole = new UserRole();
    designerRole.roleType = designerRoleName;
    const user = new User([designerRole]);
    const agendaContainers = NavBuilder.build(user);
    expect(agendaContainers[0].label).toBe('Trainings');
  });
});
