export type KeyboardThemeProps = {
  keyWidth: number;
  keyHeight: number;
  keyboardWidth: number;
  keyboardHeight: number;
  keyPaddingX: number;
  keyPaddingY: number;
  keyBgWidth: number;
  keyBgHeight: number;
  aRowShift: number;
  bRowShift: number;
  cRowShift: number;
  dRowShift: number;
  keyLabelX: number;
  keyLabelY: number;
  rX: number;
  rY: number;
};

const variables: KeyboardThemeProps = {
  keyWidth: 100,
  keyHeight: 100,
  get keyboardWidth() {
    return 15 * this.keyWidth;
  },
  get keyboardHeight() {
    return 5 * this.keyHeight;
  },
  keyPaddingX: 10,
  keyPaddingY: 10,
  get keyBgWidth() {
    return this.keyWidth - this.keyPaddingX * 2;
  },
  get keyBgHeight() {
    return this.keyHeight - this.keyPaddingY * 2;
  },
  dRowShift: 50,
  cRowShift: 80,
  bRowShift: 130,
  aRowShift: 130,
  rX: 10,
  rY: 10,
  keyLabelX: 50,
  keyLabelY: 50,
};

export default variables;
