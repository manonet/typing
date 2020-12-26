import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import { PracticeTextLetterArray } from '@types';
import setupStore from '@utils/createStoreTestHelper';

import { SPACE_CHAR } from '../PracticeTextChar';

import RenderPracticeRows, { PRACTICE_ROW_CLASS } from './RenderPracticeRows';

const testPracticeTextLetterArray: PracticeTextLetterArray = [
  { practiceChar: 'a', index: 0 },
  { practiceChar: 's', index: 1 },
  { practiceChar: 'd', index: 2 },
  { practiceChar: 'f', index: 3 },
  { practiceChar: ' ', index: 4 },
  { practiceChar: 'j', index: 5 },
  { practiceChar: 'k', index: 6 },
  { practiceChar: 'l', index: 7 },
  { practiceChar: 'é', index: 8 },
  { practiceChar: ' ', index: 9 },
  { practiceChar: 'q', index: 10 },
  { practiceChar: 'w', index: 11 },
  { practiceChar: 'e', index: 12 },
  { practiceChar: 'r', index: 13 },
  { practiceChar: ' ', index: 14 },
  { practiceChar: 't', index: 15 },
  { practiceChar: 'z', index: 16 },
  { practiceChar: 'u', index: 17 },
  { practiceChar: 'i', index: 18 },
  { practiceChar: ' ', index: 19 },
  { practiceChar: 'y', index: 20 },
  { practiceChar: 'x', index: 21 },
  { practiceChar: 'c', index: 22 },
  { practiceChar: 'v', index: 23 },
  { practiceChar: ' ', index: 24 },
  { practiceChar: 'b', index: 25 },
  { practiceChar: 'n', index: 26 },
  { practiceChar: 'm', index: 27 },
  { practiceChar: '.', index: 28 },
];
describe('<RenderPracticeRows>', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays one row if there is no need for a line break', () => {
    const store = setupStore({});

    const wrapper = mount(
      <Provider store={store}>
        <RenderPracticeRows
          practiceTextArray={testPracticeTextLetterArray}
          practiceRowLength={100}
          cursorAt={0}
          scrollContentTo={() => {}}
        />
      </Provider>
    );

    // it wraps the only row with PRACTICE_ROW_CLASS
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`)).toHaveLength(1);
    // it renders the row content as text
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).text()).toBe(
      `asdf${SPACE_CHAR}jklé${SPACE_CHAR}qwer${SPACE_CHAR}tzui${SPACE_CHAR}yxcv${SPACE_CHAR}bnm.`
    );
  });

  it('limits the line length to `practiceRowLength`', () => {
    const store = setupStore({});

    const wrapper = mount(
      <Provider store={store}>
        <RenderPracticeRows
          practiceTextArray={testPracticeTextLetterArray}
          practiceRowLength={3}
          cursorAt={0}
          scrollContentTo={() => {}}
        />
      </Provider>
    );

    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(0).text()).toBe('asd');
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(1).text()).toBe(
      `f${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(2).text()).toBe('jkl');
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(3).text()).toBe(
      `é${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(4).text()).toBe('qwe');
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(5).text()).toBe(
      `r${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(6).text()).toBe('tzu');
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(7).text()).toBe(
      `i${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(8).text()).toBe('yxc');
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(9).text()).toBe(
      `v${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(10).text()).toBe('bnm');
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(11).text()).toBe('.');
  });

  it('includes spaces to the desired row length, they stay at the end of the row', () => {
    const store = setupStore({});

    const wrapper = mount(
      <Provider store={store}>
        <RenderPracticeRows
          practiceTextArray={testPracticeTextLetterArray}
          practiceRowLength={5} // number of characters
          cursorAt={0}
          scrollContentTo={() => {}}
        />
      </Provider>
    );

    // it wraps every row with PRACTICE_ROW_CLASS
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`)).toHaveLength(6);
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(0).text()).toBe(
      `asdf${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(1).text()).toBe(
      `jklé${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(2).text()).toBe(
      `qwer${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(3).text()).toBe(
      `tzui${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(4).text()).toBe(
      `yxcv${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(5).text()).toBe('bnm.');
  });

  it('it breaks every word to new line which would be broken', () => {
    const store = setupStore({});

    const wrapper = mount(
      <Provider store={store}>
        <RenderPracticeRows
          practiceTextArray={testPracticeTextLetterArray}
          practiceRowLength={9} // number of characters
          cursorAt={0}
          scrollContentTo={() => {}}
        />
      </Provider>
    );

    // it wraps every row with PRACTICE_ROW_CLASS
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`)).toHaveLength(5);
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(0).text()).toBe(
      `asdf${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(1).text()).toBe(
      `jklé${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(2).text()).toBe(
      `qwer${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(3).text()).toBe(
      `tzui${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(4).text()).toBe(
      `yxcv${SPACE_CHAR}bnm.`
    );
  });

  it('it displays as many word as many can fit to the desired length', () => {
    const store = setupStore({});

    const wrapper = mount(
      <Provider store={store}>
        <RenderPracticeRows
          practiceTextArray={testPracticeTextLetterArray}
          practiceRowLength={10} // number of characters
          cursorAt={0}
          scrollContentTo={() => {}}
        />
      </Provider>
    );

    // it wraps every row with PRACTICE_ROW_CLASS
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`)).toHaveLength(3);
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(0).text()).toBe(
      `asdf${SPACE_CHAR}jklé${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(1).text()).toBe(
      `qwer${SPACE_CHAR}tzui${SPACE_CHAR}`
    );
    expect(wrapper.find(`.${PRACTICE_ROW_CLASS}`).at(2).text()).toBe(
      `yxcv${SPACE_CHAR}bnm.`
    );
  });
});
