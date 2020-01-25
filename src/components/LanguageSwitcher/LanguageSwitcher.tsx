import React from 'react';
import classNames from 'classnames';
// @ts-ignore
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';

const languageName = {
  en: 'English',
  hu: 'Magyar',
  de: 'Deutsch',
};

export interface IntlContextConsumerProps {
  languages: (keyof typeof languageName)[];
  language: keyof typeof languageName;
}

const LanguageSwitcher = () => (
  <nav className="languageSwitcher">
    <ul className="languageSwitcher__list">
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
              className={classNames('languageSwitcher__item', {
                ['languageSwitcher__item--active']: currentLocale === language,
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

export default LanguageSwitcher;
