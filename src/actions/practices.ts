export type PracticeAction = ReturnType<
  | typeof initPractice
  | typeof startPractice
  | typeof pausePractice
  | typeof continuePractice
  | typeof summarizePractice
>;

// INIT_PRACTICE

export const INIT_PRACTICE = 'INIT_PRACTICE';

export function initPractice(lessonText: string) {
  return { type: INIT_PRACTICE, lessonText };
}

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

// END_PRACTICE - not needed, can be calculated in reducer. If the user input is as long as the practice, the practice reached its end.

// SUMMARIZE_PRACTICE

export const SUMMARIZE_PRACTICE = 'SUMMARIZE_PRACTICE';

export function summarizePractice() {
  return { type: SUMMARIZE_PRACTICE };
}
