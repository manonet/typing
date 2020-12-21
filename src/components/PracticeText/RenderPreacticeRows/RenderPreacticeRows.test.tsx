import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import { PracticeTextLetterArray } from '@types';
import setupStore from '@utils/createStoreTestHelper';

import { SPACE_CHAR } from '../PracticeTextChar';

import RenderPreacticeRows, { PRACTICE_ROW_CLASS } from './RenderPreacticeRows';

const testPracticeTextLetterArray: PracticeTextLetterArray = [
  ['a', 0],
  ['s', 1],
  ['d', 2],
  ['f', 3],
  [' ', 4],
  ['j', 5],
  ['k', 6],
  ['l', 7],
  ['é', 8],
  [' ', 9],
  ['q', 10],
  ['w', 11],
  ['e', 12],
  ['r', 13],
  [' ', 14],
  ['t', 15],
  ['z', 16],
  ['u', 17],
  ['i', 18],
  [' ', 19],
  ['y', 20],
  ['x', 21],
  ['c', 22],
  ['v', 23],
  [' ', 24],
  ['b', 25],
  ['n', 26],
  ['m', 27],
  ['.', 28],
];
describe('<RenderPreacticeRows>', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays one row if there is no need for a line break', () => {
    const store = setupStore({});

    const wrapper = mount(
      <Provider store={store}>
        <RenderPreacticeRows
          practiceTextArray={testPracticeTextLetterArray}
          practiceRowLength={100}
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
        <RenderPreacticeRows
          practiceTextArray={testPracticeTextLetterArray}
          practiceRowLength={3}
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
        <RenderPreacticeRows
          practiceTextArray={testPracticeTextLetterArray}
          practiceRowLength={5} // number of characters
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
        <RenderPreacticeRows
          practiceTextArray={testPracticeTextLetterArray}
          practiceRowLength={9} // number of characters
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
        <RenderPreacticeRows
          practiceTextArray={testPracticeTextLetterArray}
          practiceRowLength={10} // number of characters
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
