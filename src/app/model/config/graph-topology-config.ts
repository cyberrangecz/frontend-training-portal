import {environment} from "../../../environments/environment";
import {Kypo2TopologyGraphConfig} from "kypo2-topology-graph";

export const TrainingRunTopologyGraphConfig: Kypo2TopologyGraphConfig = {
  decoratorsRestUrl: environment.decoratorsRestUrl,
  defaultDecoratorRefreshPeriodInSeconds: environment.defaultDecoratorRefreshPeriodInSeconds,
  topologyRestUrl: environment.topologyRestUrl,
  useRealTime: environment.useRealTime,
  useDecorators: environment.useDecorators,
};
