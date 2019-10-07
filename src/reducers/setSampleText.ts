import { SetSampleTextAction } from '../actions/index';
export type SetSampleTextState = {
  sampleText: string;
};

const initialState: SetSampleTextState = {
  sampleText: '',
};

export default function setSampleTextReducer(
  state: SetSampleTextState = initialState,
  action: SetSampleTextAction
) {
  const { type, sampleText } = action;
  if (type === 'SET_SAMPLE_TEXT') {
    return Object.assign({}, state, {
      sampleText,
    });
  }
  return state;
}
