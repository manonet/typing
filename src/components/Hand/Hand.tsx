import classNames from 'classnames';
import React from 'react';

import { HandSide, Fingers } from '../../types';

type Props = {
  handSide: HandSide;
  className?: string;
  fingers?: {
    [key in Fingers]?: string;
  };
};

export default function Hand({ className, fingers, handSide }: Props) {
  return (
    <svg
      className={classNames('hand', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96.3 133"
      transform={handSide === 'right' ? 'scale(-1,1)' : ''}
      fill="#fff"
    >
      <g>
        <path d="M43 45c-2.5.3-8.7.7-11.8 3.5 0 1-.2 1.7-.4 1.8-.4.1-.6-.3-.8-1-2.6.8-7.8 2.5-10.4 7.6 0 .7-.2 1.1-.3 1.4-1 1-1.4 1-2-.2-8 4.6-8.8 9.3-9.5 8.6.4 2.4.6 4.7.5 6.7 0 6 2.4 20 6.7 28.6a55 55 0 017.3 23.8s-.8 5.8 17.2 7c18 1.4 18.2-5.9 18.2-5.9-.2-6-.3-14 3.3-16.5a145.8 145.8 0 0018.3-20.8c-1.8-6.5-7.5-12-13.5-16.4h-.5c-2.7-.5-9.4-15.6-9.3-24.1v-1.3c.3.4-1.4-4.5-12-2.5-.1.5-.3.8-.5.8-.3 0-.4-.4-.6-1z" />

        <path
          className={classNames({
            [`finger--${fingers?.thumb}`]: fingers?.thumb,
          })}
          d="M90.8 52c-3.7-.1-8.5 1.6-14.3 8.3-3.6 4-8 12.6-10.7 13 1.5 7.8 5 15 13.5 16.3 3.3-6 .7-10.6 8-21.6 5-7.5 11.9-13.9 7.8-15.3-1.2-.4-2.7-.8-4.3-.8z"
        />
        <path
          className={classNames({
            [`finger--${fingers?.index}`]: fingers?.index,
          })}
          d="M51.7 3.3c-2.7-.1-5.4 2-5.7 6.7-.9 13-.8 31.3-2 35.3 2.6 3.4 9 5 12 2.5.1-8.7.1-23.1.7-38.4.1-3.8-2.4-6-5-6.1z"
        />
        <path
          className={classNames({
            [`finger--${fingers?.middle}`]: fingers?.middle,
          })}
          d="M33.7 0c-2.7 0-5.2 2.6-5 6.7.5 7.5 3.1 34.5 2.5 41.8 3.1 2.9 9.3-.5 11.7-3.5-.7-3.8.1-17.7-3.3-37.4C38.6 2.3 36 0 33.7 0z"
        />
        <path
          className={classNames({
            [`finger--${fingers?.ring}`]: fingers?.ring,
          })}
          d="M16.7 9.7c-2.7.1-5 3.3-4 7.5C15 26 20 50.5 19.6 57c3.8 0 8.7-3.4 10.4-7.7-1-3.4-1.9-14.8-8.5-34.8-1-3.4-3-4.8-4.8-4.7z"
        />
        <path
          className={classNames({
            [`finger--${fingers?.little}`]: fingers?.little,
          })}
          d="M4 27.8C1.4 27.7-1.2 31.3.4 37c1.8 6.5 5.9 19.4 7.3 29.7 4.1-.5 7.4-3.4 9.4-8.6-1.3-2.7-3.4-11.3-11-28.4-.5-1.3-1.4-2-2.3-2z"
        />
      </g>
    </svg>
  );
}
