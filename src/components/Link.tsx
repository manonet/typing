// See: https://github.com/wiziple/gatsby-plugin-intl/blob/master/src/link.js

import React from 'react';
import GatsbyLink from 'gatsby-link';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';

type Props = {
  to: string;
} & InjectedIntlProps;

class Link extends React.Component<Props> {
  render() {
    const { to, language, children, intl, ...rest } = this.props;

    const languageLink = language || intl.locale;
    const link =
      intl.routed || languageLink ? `/${languageLink}${to}` : `${to}`;
    return (
      <GatsbyLink {...rest} to={link}>
        {children}
      </GatsbyLink>
    );
  }
}

export default injectIntl(Link);
