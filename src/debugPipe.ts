import { DEBUG_MODE } from './debugMode';
import { DebugLabel } from './entities';
import { newEvent } from './performancePipe';

/**
 * Useful for debugging pipes (such as `ramda/pipe` and `lodash/flow`)
 */
export const debugPipe = <T>(
  labelOrCallback?: DebugLabel | ((anything: T) => void),
) => (input: T): T => {
  if (!DEBUG_MODE) {
    return input;
  }

  switch (typeof labelOrCallback) {
    case 'string':
      newEvent(labelOrCallback);
      console.log({ [labelOrCallback]: input });
      break;

    case 'function':
      labelOrCallback(input);
      break;

    case 'undefined':
      console.log(input);
      break;

    default:
      break;
  }

  return input;
};
