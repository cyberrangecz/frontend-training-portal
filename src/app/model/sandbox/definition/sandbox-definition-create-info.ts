/**
 * Contains info for sandbox definition creation
 */
export class SandboxDefinitionCreateInfo {
  sandboxGitlabUrl: string;
  sandboxRevision: string;

  constructor(sandboxGitlabUrl: string, sandboxRevision: string) {
    this.sandboxGitlabUrl = sandboxGitlabUrl;
    this.sandboxRevision = sandboxRevision;
  }
}
