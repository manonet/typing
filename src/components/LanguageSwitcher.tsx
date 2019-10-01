import React from 'react';
import classNames from 'classnames';
// @ts-ignore
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';

import {
  withStyles,
  withTheme,
  createStyles,
  Theme,
  WithStyles,
} from '@material-ui/core/styles';

const languageName = {
  en: 'English',
  hu: 'Magyar',
  de: 'Deutsch',
};

export interface IntlContextConsumerProps {
  languages: (keyof typeof languageName)[];
  language: keyof typeof languageName;
}

const styles = (theme: Theme) =>
  createStyles({
    languageSwitcher: {
      borderBottom: `1px solid ${theme.palette.grey[500]}`,
      margin: '8px 0',
    },
    languageSwitcher__list: {
      display: 'flex',
      margin: 0,
      padding: '8px 0',
    },
    languageSwitcher__item: {
      display: 'flex',
      cursor: 'pointer',
      marginLeft: 10,
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
    active: {
      '&, &:hover': {
        color: theme.palette.grey[100],
        cursor: 'default',
      },
    },
  });

const LanguageSwitcher = ({ classes }: WithStyles<typeof styles>) => (
  <nav className={classes.languageSwitcher}>
    <ul className={classes.languageSwitcher__list}>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }: IntlContextConsumerProps) =>
          languages.map((language) => (
            <li
              key={language}
              onClick={() =>
                currentLocale !== language ? changeLocale(language) : null
              }
              onKeyDown={() =>
                currentLocale !== language ? changeLocale(language) : null
              }
              role="menuitem"
              tabIndex={0}
              className={classNames(classes.languageSwitcher__item, {
                [classes.active]: currentLocale === language,
              })}
            >
              {languageName[language]}
            </li>
          ))
        }
      </IntlContextConsumer>
    </ul>
  </nav>
);

export default withTheme(withStyles(styles)(LanguageSwitcher));
