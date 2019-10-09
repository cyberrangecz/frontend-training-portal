export class SandboxDefinitionInfo {
  sandboxGitlabUrl: string;
  sandboxRevision: string;

  constructor(sandboxGitlabUrl: string, sandboxRevision: string) {
    this.sandboxGitlabUrl = sandboxGitlabUrl;
    this.sandboxRevision = sandboxRevision;
  }
}
