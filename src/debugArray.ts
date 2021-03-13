import { DEBUG_MODE } from './debugMode';
import { DebugLabel } from './entities';

/**
 * Use with `Array.prorotype.map` chains.
 * @param labelOrcallback if you pas a string or undefined, console.log will be used.  If you pass a function, your custom funciton will be used instead.
 */
export const debugArray = <T>(labelOrcallback?: DebugLabel | ((array: readonly T[]) => void)) => (
  item: T,
  index: number,
  array: readonly T[],
) => {
  if (!DEBUG_MODE) {
    return item;
  }

  const lastIteration = index === array.length - 1;
  if (lastIteration) {
    switch (typeof labelOrcallback) {
      case 'string':
        console.log({ [labelOrcallback]: array });
        break;

      case 'function':
        labelOrcallback(array);
        break;

      case 'undefined':
        console.log(array);
        break;

      default:
        break;
    }
  }

  return item;
};
