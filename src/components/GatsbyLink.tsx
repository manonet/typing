import React from 'react';
// @ts-ignore
import { Link as GatsbyLink } from 'gatsby-plugin-intl';

type Props = {
  to: string;
  children: typeof Link;
  innerRef: React.RefObject<HTMLAnchorElement>;
};

type LinkProps = {
  to: string;
  activeClassName: string;
  partiallyActive?: boolean;
};

function ALink({ to, children, innerRef, ...other }: Props) {
  return (
    <a href={to} ref={innerRef} {...other}>
      {children}
    </a>
  );
}

const Link = React.forwardRef(function Link(
  { to, activeClassName, partiallyActive, ...other }: LinkProps,
  ref
) {
  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    const file = /\.[0-9a-z]+$/i.test(to);

    if (file) {
      // @ts-ignore TODO
      return <ALink href={to} innerRef={ref} {...other} />;
    }
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        innerRef={ref}
        {...other}
      />
    );
  }
  // @ts-ignore TODO
  return <ALink href={to} innerRef={ref} {...other} />;
});

Link.displayName = `Link`;

export default Link;
