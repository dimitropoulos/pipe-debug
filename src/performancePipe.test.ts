import {
  add, map, multiply, pipe,
} from 'ramda';

import { debugPipe } from './debugPipe';
import {
  debugEvents,
  endTimings,
  newEvent,
  reset,
  startTimings,
} from './performancePipe';

describe('tests data management', () => {
  beforeAll(() => {
    jest.spyOn(global.console, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('starts off empty', () => {
    expect(debugEvents).toStrictEqual([]);
  });

  it('adds new data', () => {
    startTimings('myGroup')([1, 2, 3]);
    newEvent('ziltoid');

    expect(debugEvents).toMatchObject([
      ['0', expect.any(Number)],
      ['ziltoid', expect.any(Number)],
    ]);

    reset();
  });

  it('gets a performance readout', () => {
    const output = pipe(
      () => [1, 2, 3],
      startTimings(),
      map(add(1)),
      debugPipe('first addition'),
      map(multiply(10)),
      debugPipe('second addition'),
      endTimings(),
    )();

    const { mock } = console.log as unknown as jest.SpyInstance;

    expect(mock.calls[2][0]).toMatchObject({ pipePerformance: [
      { 'first addition': expect.any(Number) },
      { 'second addition': expect.any(Number) },
    ] });
    expect(output).toStrictEqual([20, 30, 40]);
  });

  it('gets a performance readout with a custom label', () => {
    const output = pipe(
      () => [1, 2, 3],
      startTimings('bigDataProcessingJob'),
      map(add(1)),
      debugPipe('first addition'),
      map(multiply(10)),
      debugPipe('second addition'),
      endTimings(),
    )();

    const { mock } = console.log as unknown as jest.SpyInstance;

    expect(mock.calls[2][0]).toMatchObject({ bigDataProcessingJob: [
      { 'first addition': expect.any(Number) },
      { 'second addition': expect.any(Number) },
    ] });
    expect(output).toStrictEqual([20, 30, 40]);
  });
});
