export type DebugLabel = string;
export type DebugTimestamp = number;
export type DurationMilliseconds = number;
export type DebugEvent = [DebugLabel, DebugTimestamp];
export type PerformanceReadout = {
  [debugLabel in DebugLabel]: DurationMilliseconds;
};
export type DebugTimestampsByLabel = {
  [debugLabel in DebugLabel]: DebugTimestamp[];
};
