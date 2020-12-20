const Modal = require('react-modal');

const oldFn = Modal.setAppElement;
Modal.setAppElement = (element) => {
  if (element === '#___gatsby') {
    // otherwise it will throw aria warnings.
    return oldFn(document.createElement('div'));
  }
  oldFn(element);
};
module.exports = Modal;
