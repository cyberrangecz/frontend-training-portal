import {TopologyConfig} from "graph-topology";

export class CustomTopologyConfig extends TopologyConfig {

  decoratorsRestUrl = '';
  defaultDecoratorRefreshPeriodInSeconds = 3;
  topologyRestUrl = '/assets/sample-data/graph-test-data.json';
  useRealTime = false;
  useDecorators = false;
}
