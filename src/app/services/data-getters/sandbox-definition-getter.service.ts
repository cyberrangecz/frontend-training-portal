import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {SandboxDefinition} from "../../model/sandbox/sandbox-definition";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {TrainingDefinitionGetterService} from "./training-definition-getter.service";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";

@Injectable()
export class SandboxDefinitionGetterService {

  constructor(
    private http: HttpClient,
    private trainingDefinitionGetter: TrainingDefinitionGetterService) {
  }


  getSandboxDefs(): Observable<SandboxDefinition[]> {
    return this.http.get(environment.getSandboxDefsUri)
      .pipe(map(response =>
      this.parseSandboxDefs(response)));
  }

  getSandboxDefById(sandboxId: number): Observable<SandboxDefinition> {
    return this.getSandboxDefs().pipe(map(sandboxes => {
      const filtered = sandboxes.filter(sandbox => sandbox.id === sandboxId);
      return filtered ? filtered[0] : null;
    }));
  }

  getSandboxDefsByUserId(userId: number): Observable<SandboxDefinition[]> {
    return this.getSandboxDefs()
      .pipe(map(sandboxDefs =>
        sandboxDefs.filter(sandboxDef =>
        sandboxDef.authorIds.includes(userId))));
  }

  private parseSandboxDefs(sandboxDefsJson): SandboxDefinition[] {
    const sandboxDefs: SandboxDefinition[] =[];

    sandboxDefsJson.sandbox_defs.forEach(sandboxJson => {
      const sandbox = new SandboxDefinition(
        sandboxJson.title,
        this.parseAuthorIds(sandboxJson.authors));
      sandbox.id = sandboxJson.id;
      this.determineIfSandboxCanBeRemoved(sandbox);
      sandboxDefs.push(sandbox);
    });
    return sandboxDefs;
  }

  private parseAuthorIds(authorsJson) {
    const ids: number[] = [];
    authorsJson.forEach(author => ids.push(author.id));
    return ids;
  }

  determineIfSandboxCanBeRemoved(sandbox: SandboxDefinition) {
    // TODO: implement more effectively, this way all trainings are requested for each sandbox
    this.trainingDefinitionGetter.getTrainingDefsBySandboxDefId(sandbox.id)
      .subscribe(trainings =>
        sandbox.canBeRemoved = trainings.length === 0
          || trainings.every(training =>
            training.state === TrainingDefinitionStateEnum.Archived));
  }
}
