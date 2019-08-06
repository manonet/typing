import { createMuiTheme } from '@material-ui/core/styles';

const themeJson = require('../theme/theme.json');
const keyboardVariables = require('../theme/variables.js');

const theme = createMuiTheme(Object.assign({}, themeJson, keyboardVariables));

export default theme;
