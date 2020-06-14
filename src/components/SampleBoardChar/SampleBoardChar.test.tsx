import { mount } from 'enzyme';
import React from 'react';

import SampleBoardChar from './SampleBoardChar';

describe('<SampleBoardChar>', () => {
  it('renders properly', () => {
    const wrapper = mount(
      <SampleBoardChar key={2} index={2} cursorAt={1} userText="abc" char="b" />
    );

    expect(wrapper.find('.SampleBoardChar')).toHaveLength(1);
  });
});
