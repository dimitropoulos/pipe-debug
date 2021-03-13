import { debugArray } from './debugArray';

describe('debugReduce', () => {
  beforeAll(() => {
    jest.spyOn(global.console, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not mutate the array', () => {
    const simpleArray = ['a', 1, true, 1.1];
    let afterDebugging = simpleArray.map(debugArray());

    expect(afterDebugging).toStrictEqual(['a', 1, true, 1.1]);

    afterDebugging = simpleArray.map(debugArray('label'));

    expect(afterDebugging).toStrictEqual(['a', 1, true, 1.1]);

    afterDebugging = simpleArray.map(debugArray(callback => ({ callback })));

    expect(afterDebugging).toStrictEqual(['a', 1, true, 1.1]);
  });

  it('logs a simple array without a label', () => {
    [1, 2, 3, 4, 5].map(debugArray());

    expect(console.log).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
  });

  it('logs a simple array with a label', () => {
    [1, 2, 3, 4, 5].map(debugArray('simpleArray'));

    expect(console.log).toHaveBeenCalledWith({ simpleArray: [1, 2, 3, 4, 5] });
  });

  it('passes the array to a custom callback', () => {
    const spy = jest.fn();

    [1, 2, 3, 4, 5].map(debugArray(spy));

    expect(console.log).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
  });

  it('logs a simple array with a custom callback', () => {
    let customState: { customLogger?: number[] } = {};
    const spy = jest.fn(customLogger => {
      customState = { customLogger };
    });

    [1, 2, 3, 4, 5].map(debugArray(spy));

    expect(console.log).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
    expect(customState).toStrictEqual({ customLogger: [1, 2, 3, 4, 5] });
  });
});
