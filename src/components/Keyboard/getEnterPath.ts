import mem from 'mem';

import variables from '../../theme/variables';
import { Layout } from '../../types';

function getEnterPath({ layout }: { layout: Layout }) {
  const {
    cRowShift,
    dRowShift,
    keyHeight,
    keyPaddingX,
    keyPaddingY,
    keyWidth,
    rX,
    rY,
  } = variables;

  const leftD = dRowShift + keyWidth * 13;
  let leftC = cRowShift + keyWidth * 13;
  const right = keyWidth * 2 + keyWidth * 13;
  const top = keyHeight;
  const bottom = keyHeight * 3;

  let enterPath = '';
  if (layout === '101/104-Variant' || layout === '103/106-KS') {
    // 3
    /* shape:
            -x
            xx
        */

    leftC = leftC - keyWidth;
    enterPath = `M${leftD + keyPaddingX} ${rY + top + keyPaddingY}\
        A ${rX} ${rY}, 0, 0, 1, ${leftD + rX + keyPaddingX} ${
      top + keyPaddingY
    }\
        L ${right - rX - keyPaddingX} ${top + keyPaddingY}\
        A ${rX} ${rY}, 0, 0, 1, ${right - keyPaddingX} ${
      rY + top + keyPaddingY
    }\
        L ${right - keyPaddingX} ${bottom - rY - keyPaddingY}\
        A ${rX} ${rY}, 0, 0, 1, ${right - rX - keyPaddingX} ${
      bottom - keyPaddingY
    }\
        L ${leftC + rX + keyPaddingX} ${bottom - keyPaddingY}\
        A ${rX} ${rY}, 0, 0, 1, ${leftC + keyPaddingX} ${
      bottom - rY - keyPaddingY
    }\
        L ${leftC + keyPaddingX} ${top + keyHeight + rY + keyPaddingY}\
        A ${rX} ${rY}, 0, 0, 1, ${leftC + rX + keyPaddingX} ${
      top + keyHeight + keyPaddingY
    }\
        L ${leftD - rX + keyPaddingX} ${keyHeight + top + keyPaddingY}\
        A ${rX} ${rY}, 0, 0, 0, ${leftD + keyPaddingX} ${
      top + keyHeight - rY + keyPaddingY
    }\
        L ${leftD + keyPaddingX} ${rY + top + keyPaddingY} Z`;
  } else if (layout !== '101/104-ANSI') {
    enterPath = `M${leftD + keyPaddingX} ${rY + top + keyPaddingY}\
      A ${rX} ${rY}, 0, 0, 1, ${leftD + rX + keyPaddingX} ${top + keyPaddingY}\
      L ${right - rX - keyPaddingX} ${top + keyPaddingY}\
      A ${rX} ${rY}, 0, 0, 1, ${right - keyPaddingX} ${top + rY + keyPaddingY}\
      L ${right - keyPaddingX} ${bottom - rY - keyPaddingY}\
      A ${rX} ${rY}, 0, 0, 1, ${right - rX - keyPaddingX} ${
      bottom - keyPaddingY
    }\
      L ${leftC + rX + keyPaddingX} ${bottom - keyPaddingY}\
      A ${rX} ${rY}, 0, 0, 1, ${leftC + keyPaddingX} ${
      bottom - rY - keyPaddingY
    }\
      L ${leftC + keyPaddingX} ${top + keyHeight + rY - keyPaddingY}\
      A ${rX} ${rY}, 0, 0, 0, ${leftC - rX + keyPaddingX} ${
      top + keyHeight - keyPaddingY
    }\
      L ${leftD + rX + keyPaddingX} ${top + keyHeight - keyPaddingY}\
      A ${rX} ${rY}, 0, 0, 1, ${leftD + keyPaddingX} ${
      top + keyHeight - rY - keyPaddingY
    }\
      L ${leftD + keyPaddingX} ${top + rY + keyPaddingY} Z`;
  }

  return enterPath;
}

export default mem(getEnterPath);
