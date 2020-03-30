const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

module.exports = configure({ adapter: new Adapter() });
