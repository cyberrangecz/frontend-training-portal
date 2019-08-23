import { FormGroup, FormControl, ValidatorFn, ValidationErrors, Validators } from "@angular/forms";
import {TrainingInstance} from "../../../../model/training/training-instance";

export class TrainingInstanceFormGroup{

    formGroup: FormGroup;

    constructor(){
        this.formGroup = new FormGroup({
            'startTime': new FormControl('', [Validators.required, this.dateValidator]),
            'endTime': new FormControl('', [Validators.required, this.dateValidator]),
            'title': new FormControl('', [Validators.required]),
            'poolSize': new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
            'organizers': new FormControl('', [Validators.required]),
            'trainingDefinition': new FormControl('', [Validators.required]),
            'accessToken': new FormControl('', [Validators.required]),
        },  { validators: this.dateSequenceValidator })
    }

    get startTime() {return this.formGroup.get('startTime')};
    get endTime() {return this.formGroup.get('endTime')};
    get title() {return this.formGroup.get('title')};
    get poolSize() {return this.formGroup.get('poolSize')};
    get organizers() {return this.formGroup.get('organizers')};
    get trainingDefinition() {return this.formGroup.get('trainingDefinition')};
    get accessToken() {return this.formGroup.get('accessToken')};

    private dateSequenceValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
      let error = null;
      const startTime = control.get('startTime').value;
      const endTime = control.get('endTime').value;
      if (startTime && endTime && startTime.valueOf() > endTime.valueOf()) {
        error = { startTimeAfterEndTime: true };
      }
      return error ? error : null;
    }
  
    private dateValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
      let error = null;
      if (control.value && control.value.valueOf() < Date.now()) {
        error = { dateInPast: true };
      }
  
      return error ? error : null;
    }
  

    setInputValuesToTraining(trainingInstance: TrainingInstance) {
        trainingInstance.startTime = this.startTime.value;
        trainingInstance.endTime = this.endTime.value;
        trainingInstance.title = this.title.value;
        trainingInstance.poolSize = this.poolSize.value;
        trainingInstance.organizers = this.organizers.value;
        trainingInstance.trainingDefinition = this.trainingDefinition.value;
        trainingInstance.accessToken = this.accessToken.value;
      }
    
      /**
       * Sets initial input values from passed training instance object (edit mode)
       */
    setInputValuesFromTraining(trainingInstance: TrainingInstance) {
        this.startTime.setValue(trainingInstance.startTime);
        this.endTime.setValue(trainingInstance.endTime);
        this.title.setValue(trainingInstance.title);
        this.poolSize.setValue(trainingInstance.poolSize);
        this.organizers.setValue(trainingInstance.organizers);
        this.trainingDefinition.setValue(trainingInstance.trainingDefinition);
        this.accessToken.setValue(trainingInstance.accessToken);
     
      }
}


