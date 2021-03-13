// eslint-disable-next-line import/no-mutable-exports -- because I know for sure that this isn't exporeted to the user and is not in fact mutated anywhere in the app, this is OK.  Yes, I could make a function that wraps it but I want to avoid any unnecessary closures.
export let DEBUG_MODE = true;

export const setDebugMode = (debugMode: boolean) => {
  DEBUG_MODE = debugMode;
};
