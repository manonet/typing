export type PracticeAction = ReturnType<
  // | typeof initializeNewPractice
  // | typeof initializeRepeatPractice
  typeof startPractice | typeof pausePractice | typeof continuePractice
>;

// INITIALIZE_NEW_PRACTICE

// export const INITIALIZE_NEW_PRACTICE = 'INITIALIZE_NEW_PRACTICE';

// export function initializeNewPractice() {
//   return { type: INITIALIZE_NEW_PRACTICE };
// }

// // INITIALIZE_REPEAT_PRACTICE

// export const INITIALIZE_REPEAT_PRACTICE = 'INITIALIZE_REPEAT_PRACTICE';

// export function initializeRepeatPractice() {
//   return { type: INITIALIZE_REPEAT_PRACTICE };
// }

// START_PRACTICE

export const START_PRACTICE = 'START_PRACTICE';

export function startPractice() {
  return { type: START_PRACTICE };
}

// PAUSE_PRACTICE

export const PAUSE_PRACTICE = 'PAUSE_PRACTICE';

export function pausePractice() {
  return { type: PAUSE_PRACTICE };
}

// CONTINUE_PRACTICE

export const CONTINUE_PRACTICE = 'CONTINUE_PRACTICE';

export function continuePractice() {
  return { type: CONTINUE_PRACTICE };
}
