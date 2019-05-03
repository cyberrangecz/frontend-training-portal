import {TopologyConfig} from "graph-topology";
import {environment} from "../../../environments/environment";

export const CustomTopologyConfig: TopologyConfig = {
  decoratorsRestUrl: environment.decoratorsRestUrl,
  defaultDecoratorRefreshPeriodInSeconds: environment.defaultDecoratorRefreshPeriodInSeconds,
  topologyRestUrl: environment.topologyRestUrl,
  useRealTime: environment.useRealTime,
  useDecorators: environment.useDecorators,
};
