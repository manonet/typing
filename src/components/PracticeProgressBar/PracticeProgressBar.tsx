import classNames from 'classnames';
import React from 'react';
import { useStore } from 'react-redux';

import { State as ReduxState } from '../../reducers';

type Props = {
  className?: string;
};

const PracticeProgressBar = (props: Props) => {
  const { getState } = useStore<ReduxState>();
  const {
    typing: { isPracticing, sampleText, userText },
  } = getState();
  const { className } = props;
  const widthPercent =
    // 0 / 0 is NaN
    userText.length && sampleText.length
      ? ((userText.length / sampleText.length) * 100).toFixed(2)
      : 0;

  return (
    <div
      className={classNames(
        'practiceProgressBar',
        {
          'practiceProgressBar--open': isPracticing && userText.length,
        },
        className
      )}
      style={{ width: `${widthPercent}%` }}
    ></div>
  );
};

export default PracticeProgressBar;
