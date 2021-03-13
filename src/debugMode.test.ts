import { pipe } from 'ramda';

import { DEBUG_MODE, setDebugMode } from './debugMode';
import { debugPipe } from './debugPipe';

describe('tests debugPipe', () => {
  beforeAll(() => {
    jest.spyOn(global.console, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('tests debug mode functionality', () => {
    it('works when DEBUG_MODE is true', () => {
      expect(DEBUG_MODE).toStrictEqual(true);

      pipe(
        () => 'data',
        debugPipe(),
      )();

      expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('works when DEBUG_MODE is false', () => {
      expect(DEBUG_MODE).toStrictEqual(true);

      setDebugMode(false);

      expect(DEBUG_MODE).toStrictEqual(false);

      pipe(
        () => 'data',
        debugPipe(),
      )();

      expect(console.log).toHaveBeenCalledTimes(0);
    });
  });
});
