import {Kypo2TrainingsHurdlingVizLibConfig} from 'kypo2-trainings-hurdling-viz-lib';
import {environment} from '../../../environments/environment';

export const VisualizationHurdlingConfig: Kypo2TrainingsHurdlingVizLibConfig = {
    restBaseUrl: environment.trainingRestBasePath,
};
