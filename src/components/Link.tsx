// See: https://github.com/wiziple/gatsby-plugin-intl/blob/master/src/link.js

import GatsbyLink from 'gatsby-link';
import { useIntl } from 'gatsby-plugin-intl';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  language?: string;
  to: string;
};

export default function Link({ children, language, to, ...rest }: Props) {
  const intl = useIntl();
  const languageLink = language || intl.locale;
  // @ts-ignore FIXME figure out types
  const link = intl.routed || languageLink ? `/${languageLink}${to}` : `${to}`;
  return (
    <GatsbyLink {...rest} to={link}>
      {children}
    </GatsbyLink>
  );
}
