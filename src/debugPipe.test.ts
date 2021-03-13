import {
  add as _fpAdd,
  flow as _fpFlow,
  map as _fpMap,
} from 'lodash/fp';
import {
  add,
  map, pipe,
} from 'ramda';

import { debugPipe } from './debugPipe';


describe('tests debugPipe', () => {
  let mockedConsoleLog: jest.SpyInstance;

  beforeAll(() => {
    mockedConsoleLog = jest.spyOn(global.console, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('tests ramda/pipe usages', () => {
    const addOne = add(1);

    it('does not mutate the array', () => {
      const simpleArray = ['a', 1, true, 1.1];
      let afterDebugging = pipe(
        () => simpleArray,
        debugPipe(),
      )();

      expect(afterDebugging).toStrictEqual(['a', 1, true, 1.1]);

      afterDebugging = pipe(
        () => simpleArray,
        debugPipe('label'),
      )();

      expect(afterDebugging).toStrictEqual(['a', 1, true, 1.1]);

      afterDebugging = pipe(
        () => simpleArray,
        debugPipe(() => 0),
      )();

      expect(afterDebugging).toStrictEqual(['a', 1, true, 1.1]);
    });

    it('logs a simple array without a label', () => {
      pipe(
        () => [1, 2, 3, 4, 5],
        debugPipe(),
      )();

      expect(console.log).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
    });

    it('logs a simple array with a label', () => {
      pipe(
        () => [1, 2, 3, 4, 5],
        debugPipe('simpleArray'),
      )();

      expect(console.log).toHaveBeenCalledWith({ simpleArray: [1, 2, 3, 4, 5] });
    });

    it('passes the array to a custom callback', () => {
      const spy = jest.fn();

      pipe(
        () => [1, 2, 3, 4, 5],
        debugPipe(spy),
      )();

      expect(console.log).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
    });

    it('logs a simple array with a custom callback', () => {
      let customState: { customLogger?: number[] } = {};
      const spy = jest.fn(customLogger => {
        customState = { customLogger };
      });

      pipe(
        () => [1, 2, 3, 4, 5],
        debugPipe(spy),
      )();

      expect(console.log).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
      expect(customState).toStrictEqual({ customLogger: [1, 2, 3, 4, 5] });
    });

    it('logs multiple times', () => {
      let customState: { customLogger?: number[] } = {};
      const spy = jest.fn(customLogger => {
        customState = { customLogger };
      });

      const simpleArray = pipe(
        () => [1, 2, 3, 4, 5],
        debugPipe(),
        map(addOne),
        debugPipe('end'),
        map(addOne),
        debugPipe(spy),
      )();

      expect(mockedConsoleLog).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
      expect(mockedConsoleLog).toHaveBeenCalledWith({ end: [2, 3, 4, 5, 6] });
      expect(customState).toStrictEqual({ customLogger: [3, 4, 5, 6, 7] });
      expect(simpleArray).toStrictEqual([3, 4, 5, 6, 7]);
    });
  });

  describe('tests  lodash usages', () => {
    const addOne = _fpAdd(1);
    const map = _fpMap;
    const pipe = _fpFlow;

    it('logs multiple times with lodash/fp', () => {
      let customState: { customLogger?: number[] } = {};
      const spy = jest.fn(customLogger => {
        customState = { customLogger };
      });

      const simpleArray = pipe(
        debugPipe(),
        map(addOne),
        debugPipe('end'),
        map(addOne),
        debugPipe(spy),
      )([1, 2, 3, 4, 5]);

      expect(mockedConsoleLog).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
      expect(mockedConsoleLog).toHaveBeenCalledWith({ end: [2, 3, 4, 5, 6] });
      expect(customState).toStrictEqual({ customLogger: [3, 4, 5, 6, 7] });
      expect(simpleArray).toStrictEqual([3, 4, 5, 6, 7]);
    });
  });
});
