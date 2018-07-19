import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {SandboxDefinition} from "../../model/sandbox/sandbox-definition";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {TrainingDefinitionGetterService} from "./training-definition-getter.service";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";

@Injectable()
/**
 * Service to abstract from sandbox definition endpoint.
 * Can retrieve sandbox definition based on several parameters
 */
export class SandboxDefinitionGetterService {

  constructor(
    private http: HttpClient,
    private trainingDefinitionGetter: TrainingDefinitionGetterService) {
  }

  /**
   * Retrieves all sandbox definitions
   * @returns {Observable<SandboxDefinition[]>} Observable of sandbox definitions list
   */
  getSandboxDefs(): Observable<SandboxDefinition[]> {
    return this.http.get(environment.getSandboxDefsUri)
      .pipe(map(response =>
      this.parseSandboxDefs(response)));
  }

  /**
   * Retrieves sandbox by its id
   * @param {number} sandboxId id of sandbox which should be retrieved
   * @returns {Observable<SandboxDefinition>} Observable of retrieved sandbox definition, null if no sandbox definition with such id is found
   */
  getSandboxDefById(sandboxId: number): Observable<SandboxDefinition> {
    return this.getSandboxDefs().pipe(map(sandboxes => {
      const filtered = sandboxes.filter(sandbox => sandbox.id === sandboxId);
      return filtered ? filtered[0] : null;
    }));
  }

  /**
   * Retrieves sandboxes definitions
   * @param {number} authorId id of sandbox definition author
   * @returns {Observable<SandboxDefinition[]>} Observable of list of sandbox definitions matching authors id
   */
  getSandboxDefsByAuthorId(authorId: number): Observable<SandboxDefinition[]> {
    return this.getSandboxDefs()
      .pipe(map(sandboxDefs =>
        sandboxDefs.filter(sandboxDef =>
        sandboxDef.authorIds.includes(authorId))));
  }

  /**
   * Parses JSON received from HTTP response
   * @param sandboxDefsJson JSON defining sandbox definitions
   * @returns {SandboxDefinition[]} List of sandbox definitions created from JSON
   */
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

  /**
   * Parses JSON defining authors of sandbox definitions
   * @param authorsJson JSON defining authors of sandbox definitions
   * @returns {number[]} List of authors ids
   */
  private parseAuthorIds(authorsJson) {
    const ids: number[] = [];
    authorsJson.forEach(author => ids.push(author.id));
    return ids;
  }

  /**
   * Determines if sandbox definition can be removed (if sandbox is not associated with any training definition or all
   * associated training definitions are archived.
   * @param {SandboxDefinition} sandbox
   */
  determineIfSandboxCanBeRemoved(sandbox: SandboxDefinition) {
    // TODO: implement more effectively, this way all trainings are requested for each sandbox
    this.trainingDefinitionGetter.getTrainingDefsBySandboxDefId(sandbox.id)
      .subscribe(trainings =>
        sandbox.canBeRemoved = trainings.length === 0
          || trainings.every(training =>
            training.state === TrainingDefinitionStateEnum.Archived));
  }
}
