import { performance } from 'perf_hooks';

import { DEBUG_MODE } from './debugMode';
import {
  DebugEvent, DebugLabel, PerformanceReadout,
} from './entities';

// eslint-disable-next-line import/no-mutable-exports -- this is only exported for the tests to be able to inspect the internal state.  not otherwise exposed to library consumers
export let debugEvents: DebugEvent[] = [];
const defaultGroupLabel: DebugLabel = 'pipePerformance';
let groupLabel: DebugLabel = defaultGroupLabel;

export const reset = () => {
  debugEvents = [];
  groupLabel = defaultGroupLabel;
};

export const newEvent = (label?: DebugLabel) => {
  const debugTimestamp = performance.now() / 1000;
  debugEvents = [
    ...(debugEvents ?? []),
    [label ?? String(debugEvents.length), debugTimestamp],
  ];
};

export const getPerformanceReadout = () => debugEvents.reduce<PerformanceReadout[]>(
  (accumulator, [label, timestamp], index) => {
    if (index === 0) {
      return [];
    }

    const [, previousTimestamp] = debugEvents[index - 1];
    return [
      ...accumulator,
      { [label]: timestamp - previousTimestamp },
    ];
  },
  [],
);

export const startTimings = (label?: DebugLabel) => <T>(input: T) => {
  if (!DEBUG_MODE) {
    return input;
  }
  groupLabel = label ?? defaultGroupLabel;

  newEvent('0');
  return input;
};

export const endTimings = () => <T>(input: T) => {
  if (!DEBUG_MODE) {
    return input;
  }

  console.log({ [groupLabel]: getPerformanceReadout() });
  reset();
  return input;
};
