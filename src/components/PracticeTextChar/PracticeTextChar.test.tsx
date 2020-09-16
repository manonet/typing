import { mount } from 'enzyme';
import React from 'react';

import PracticeTextChar from './PracticeTextChar';

describe('<PracticeTextChar>', () => {
  it('renders properly', () => {
    const wrapper = mount(
      <PracticeTextChar
        key={2}
        index={2}
        cursorAt={1}
        userText="abc"
        char="b"
      />
    );

    expect(wrapper.find('.PracticeTextChar')).toHaveLength(1);
  });
});
