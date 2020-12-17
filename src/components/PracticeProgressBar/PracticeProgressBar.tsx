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
    typing: { explorerMode, lessonText, userText },
  } = getState();
  const { className } = props;
  const widthPercent =
    // 0 / 0 is NaN
    userText.length && lessonText.length
      ? (100 - (userText.length / lessonText.length) * 100).toFixed(2)
      : 100;

  return (
    <div
      className={classNames(
        'practiceProgressBar',
        {
          'practiceProgressBar--open': !explorerMode && userText.length,
        },
        className
      )}
    >
      <div
        className="practiceProgressBar__bar"
        style={{ width: `${widthPercent}%` }}
      ></div>
    </div>
  );
};

export default PracticeProgressBar;
