
module.exports = {
  // colors
  white: "#fff",
  black: "#000",
  red: "#d9534f",
  orange: "#f0ad4e",
  yellow: "#ffd500",
  green: "#5cb85c",
  blue: "#0275d8",
  teal: "#5bc0de",
  pink: "#ff5b77",
  purple: "#613d7c",

  // Create grayscale
  grayDark: "#292b2c",
  gray: "#464a4c",
  grayLight: "#636c72",
  grayLighter: "#eceeef",
  grayLightest: "#f7f7f9",

  // Derivative colors
  get colorPrimary() {
    return this.blue;
  },
  get colorSecondary() {
    return this.teal;
  },
  get colorSuccess() {
    return this.green;
  },
  get colorInfo() {
    return this.teal;
  },
  get colorWarning() {
    return this.orange;
  },
  get colorDanger() {
    return this.red;
  },
  get colorInverse() {
    return this.grayDark;
  },
  get colorLink() {
    return this.blue;
  },

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
  keyLabelY: 50
};
