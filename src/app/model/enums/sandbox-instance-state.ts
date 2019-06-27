export enum SandboxInstanceState {
  FAILED = 'FAILED',
  CREATE_FAILED = 'CREATE FAILED',
  DELETE_FAILED = 'DELETE FAILED',
  UPDATE_FAILED = 'UPDATE FAILED',
  ROLLBACK_FAILED = 'ROLLBACK FAILED',
  SUSPEND_FAILED = 'SUSPEND FAILED',
  RESUME_FAILED = 'RESUME FAILED',
  ADOPT_FAILED = 'ADOPT FAILED',
  SNAPSHOT_FAILED = 'SNAPSHOT FAILED',
  CHECK_FAILED = 'CHECK FAILED',
  RESTORE_FAILED = 'RESTORE FAILED',
  IN_PROGRESS = 'IN PROGRESS',
  CREATE_IN_PROGRESS = 'CREATE IN PROGRESS',
  DELETE_IN_PROGRESS = 'DELETE IN PROGRESS',
  UPDATE_IN_PROGRESS = 'UPDATE IN PROGRESS',
  ROLLBACK_IN_PROGRESS = 'ROLLBACK IN PROGRESS',
  SUSPEND_IN_PROGRESS = 'SUSPEND IN PROGRESS',
  RESUME_IN_PROGRESS = 'RESUME IN PROGRESS',
  ADOPT_IN_PROGRESS = 'ADOPT IN PROGRESS',
  SNAPSHOT_IN_PROGRESS = 'SNAPSHOT IN PROGRESS',
  CHECK_IN_PROGRESS = 'CHECK IN PROGRESS',
  RESTORE_IN_PROGRESS = 'RESTORE IN PROGRESS',
  FULL_BUILD_IN_PROGRESS = 'FULL BUILD IN PROGRESS',
  BOOTSTRAP_IN_PROGRESS = 'BOOTSTRAP IN PROGRESS',
  ANSIBLE_IN_PROGRESS = 'ANSIBLE IN PROGRESS',
  COMPLETE = 'COMPLETE',
  CREATE_COMPLETE = 'CREATE COMPLETE',
  DELETE_COMPLETE = 'DELETE COMPLETE',
  UPDATE_COMPLETE = 'UPDATE COMPLETE',
  ROLLBACK_COMPLETE = 'ROLLBACK COMPLETE',
  SUSPEND_COMPLETE = 'SUSPEND COMPLETE',
  RESUME_COMPLETE = 'RESUME COMPLETE',
  ADOPT_COMPLETE = 'ADOPT COMPLETE',
  SNAPSHOT_COMPLETE = 'SNAPSHOT COMPLETE',
  CHECK_COMPLETE = 'CHECK COMPLETE',
  RESTORE_COMPLETE = 'RESTORE COMPLETE',
  BOOTSTRAP_COMPLETE = 'BOOTSTRAP_COMPLETE',
  ANSIBLE_COMPLETE = 'ANSIBLE COMPLETE'
}
