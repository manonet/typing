import React from 'react';
import MuiLink from '@material-ui/core/Link';

import GatsbyLink from './GatsbyLink';

function Link(props) {
  return <MuiLink component={GatsbyLink} {...props} />;
}

export default Link;
