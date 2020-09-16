import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import setupStore from '../../utils/createStoreTestHelper';

import PracticeProgressBar from './PracticeProgressBar';

describe('<PracticeProgressBar>', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders properly', () => {
    const store = setupStore({});

    const wrapper = mount(
      <Provider store={store}>
        <PracticeProgressBar />
      </Provider>
    );

    expect(wrapper.find('.practiceProgressBar')).toHaveLength(1);
  });

  it('hides initially', () => {
    const store = setupStore({
      typing: { userText: '', isPracticing: false, lessonText: '' },
    });

    const wrapper = mount(
      <Provider store={store}>
        <PracticeProgressBar />
      </Provider>
    );

    expect(wrapper.find('.practiceProgressBar')).toHaveLength(1);
    expect(wrapper.find('.practiceProgressBar--open')).toHaveLength(0);
    expect(
      wrapper.find('.practiceProgressBar__bar').prop('style')
    ).toHaveProperty('width', '0%');
  });

  it('hides if sample text and user text is not given', () => {
    const store = setupStore({
      typing: { userText: '', isPracticing: true, lessonText: '' },
    });

    const wrapper = mount(
      <Provider store={store}>
        <PracticeProgressBar />
      </Provider>
    );

    expect(wrapper.find('.practiceProgressBar')).toHaveLength(1);
    expect(wrapper.find('.practiceProgressBar--open')).toHaveLength(0);
    expect(
      wrapper.find('.practiceProgressBar__bar').prop('style')
    ).toHaveProperty('width', '0%');
  });

  it('hides if user text is not given', () => {
    const store = setupStore({
      typing: { userText: '', isPracticing: true, lessonText: 'abcdefg' },
    });

    const wrapper = mount(
      <Provider store={store}>
        <PracticeProgressBar />
      </Provider>
    );

    expect(wrapper.find('.practiceProgressBar')).toHaveLength(1);
    expect(wrapper.find('.practiceProgressBar--open')).toHaveLength(0);
    expect(
      wrapper.find('.practiceProgressBar__bar').prop('style')
    ).toHaveProperty('width', '0%');
  });

  it('displays the proper width during the practice', () => {
    const store = setupStore({
      typing: { userText: 'abc', isPracticing: true, lessonText: 'abcdefg' },
    });

    const wrapper = mount(
      <Provider store={store}>
        <PracticeProgressBar />
      </Provider>
    );

    expect(wrapper.find('.practiceProgressBar--open')).toHaveLength(1);
    expect(
      wrapper.find('.practiceProgressBar__bar').prop('style')
    ).toHaveProperty('width', '57.14%');
  });

  it('displays 100% width on practice end', () => {
    const store = setupStore({
      typing: {
        userText: 'abcdefg',
        isPracticing: true,
        lessonText: 'abcdefg',
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <PracticeProgressBar />
      </Provider>
    );

    expect(wrapper.find('.practiceProgressBar--open')).toHaveLength(1);
    expect(
      wrapper.find('.practiceProgressBar__bar').prop('style')
    ).toHaveProperty('width', '0.00%');
  });

  it('displays 100% width even if practice ended, but it hides', () => {
    const store = setupStore({
      typing: {
        userText: 'abcdefg',
        isPracticing: false,
        lessonText: 'abcdefg',
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <PracticeProgressBar />
      </Provider>
    );

    expect(wrapper.find('.practiceProgressBar')).toHaveLength(1);
    expect(wrapper.find('.practiceProgressBar--open')).toHaveLength(0);
    expect(
      wrapper.find('.practiceProgressBar__bar').prop('style')
    ).toHaveProperty('width', '0.00%');
  });
});
