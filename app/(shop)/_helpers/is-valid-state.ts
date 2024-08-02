export const isValidState = (
  states: string[],
  stateForValidation: string,
): boolean => {
  return states.includes(stateForValidation);
};
