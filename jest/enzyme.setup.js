// https://github.com/enzymejs/enzyme/issues/2429
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const { configure } = require('enzyme');

module.exports = configure({ adapter: new Adapter() });
