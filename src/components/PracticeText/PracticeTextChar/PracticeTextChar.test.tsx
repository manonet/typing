import { mount } from 'enzyme';
import React from 'react';

import PracticeTextChar, {
  PRACTICE_TEXT_CHAR_CLASS,
  PRACTICE_TEXT_ACTIVE_CHAR_CLASS,
  PRACTICE_TEXT_DONE_CHAR_CLASS,
  PRACTICE_TEXT_ERROR_CHAR_CLASS,
  SPACE_CHAR_CLASS,
  ENTER_CHAR_CLASS,
  ENTER_CHAR,
  SPACE_CHAR,
} from './PracticeTextChar';

describe('<PracticeTextChar>', () => {
  it('renders a character properly', () => {
    const wrapper = mount(<PracticeTextChar practiceChar="a" />);

    expect(wrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`)).toHaveLength(1);
    expect(wrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`).text()).toBe('a');

    // do not add other classes to the wrapper
    expect(wrapper.find(`.${PRACTICE_TEXT_ACTIVE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${PRACTICE_TEXT_DONE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${PRACTICE_TEXT_ERROR_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${SPACE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${ENTER_CHAR_CLASS}`)).toHaveLength(0);
  });

  it('renders a space properly', () => {
    const wrapper = mount(<PracticeTextChar practiceChar=" " />);

    const charWrapper = wrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`);
    const practiceChar = charWrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`);

    expect(practiceChar).toHaveLength(1);
    expect(practiceChar.text()).toBe(SPACE_CHAR);
    expect(practiceChar).toHaveLength(1);

    // do not add other classes to the wrapper
    expect(wrapper.find(`.${PRACTICE_TEXT_ACTIVE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${PRACTICE_TEXT_DONE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${PRACTICE_TEXT_ERROR_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${ENTER_CHAR_CLASS}`)).toHaveLength(0);
    // do not add other classes to the practiceChar
    expect(
      practiceChar.find(`.${PRACTICE_TEXT_ACTIVE_CHAR_CLASS}`)
    ).toHaveLength(0);
    expect(practiceChar.find(`.${PRACTICE_TEXT_DONE_CHAR_CLASS}`)).toHaveLength(
      0
    );
    expect(
      practiceChar.find(`.${PRACTICE_TEXT_ERROR_CHAR_CLASS}`)
    ).toHaveLength(0);
    expect(practiceChar.find(`.${ENTER_CHAR_CLASS}`)).toHaveLength(0);
  });

  it('renders a new line (Enter) properly', () => {
    const wrapper = mount(
      <PracticeTextChar
        practiceChar="
"
      />
    );
    const charWrapper = wrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`);
    const practiceChar = charWrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`);

    expect(practiceChar).toHaveLength(1);
    expect(practiceChar.text()).toBe(ENTER_CHAR);
    expect(practiceChar).toHaveLength(1);

    // do not add other classes to the wrapper
    expect(wrapper.find(`.${PRACTICE_TEXT_ACTIVE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${PRACTICE_TEXT_DONE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${PRACTICE_TEXT_ERROR_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${SPACE_CHAR_CLASS}`)).toHaveLength(0);
    // do not add other classes to the practiceChar
    expect(
      practiceChar.find(`.${PRACTICE_TEXT_ACTIVE_CHAR_CLASS}`)
    ).toHaveLength(0);
    expect(practiceChar.find(`.${PRACTICE_TEXT_DONE_CHAR_CLASS}`)).toHaveLength(
      0
    );
    expect(
      practiceChar.find(`.${PRACTICE_TEXT_ERROR_CHAR_CLASS}`)
    ).toHaveLength(0);
    expect(practiceChar.find(`.${SPACE_CHAR_CLASS}`)).toHaveLength(0);
  });

  it('renders `done` state properly', () => {
    const wrapper = mount(<PracticeTextChar practiceChar="s" done />);

    expect(wrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`)).toHaveLength(1);
    expect(wrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`).text()).toBe('s');
    expect(wrapper.find(`.${PRACTICE_TEXT_DONE_CHAR_CLASS}`)).toHaveLength(1);

    // do not add other classes to the wrapper
    expect(wrapper.find(`.${PRACTICE_TEXT_ACTIVE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${PRACTICE_TEXT_ERROR_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${SPACE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${ENTER_CHAR_CLASS}`)).toHaveLength(0);
  });

  it('renders `active` state properly', () => {
    const wrapper = mount(<PracticeTextChar practiceChar="s" active />);

    expect(wrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`)).toHaveLength(1);
    expect(wrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`).text()).toBe('s');
    expect(wrapper.find(`.${PRACTICE_TEXT_ACTIVE_CHAR_CLASS}`)).toHaveLength(1);

    // do not add other classes to the wrapper
    expect(wrapper.find(`.${PRACTICE_TEXT_DONE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${PRACTICE_TEXT_ERROR_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${SPACE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${ENTER_CHAR_CLASS}`)).toHaveLength(0);
  });

  it('renders `error` state properly', () => {
    const wrapper = mount(<PracticeTextChar practiceChar="s" error />);

    expect(wrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`)).toHaveLength(1);
    expect(wrapper.find(`.${PRACTICE_TEXT_CHAR_CLASS}`).text()).toBe('s');
    expect(wrapper.find(`.${PRACTICE_TEXT_ERROR_CHAR_CLASS}`)).toHaveLength(1);

    // do not add other classes to the wrapper
    expect(wrapper.find(`.${PRACTICE_TEXT_DONE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${PRACTICE_TEXT_ACTIVE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${SPACE_CHAR_CLASS}`)).toHaveLength(0);
    expect(wrapper.find(`.${ENTER_CHAR_CLASS}`)).toHaveLength(0);
  });
});
