export class TrainingDefinitionSaveEvent {
  editMode: boolean;
  id: number;
  continueToLevels: boolean;


  constructor(editMode: boolean, id: number, continueToLevels: boolean = false) {
    this.editMode = editMode;
    this.id = id;
    this.continueToLevels = continueToLevels;
  }
}
