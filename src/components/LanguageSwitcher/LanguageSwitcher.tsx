import classNames from 'classnames';
import {
  IntlContextConsumer,
  changeLocale,
  FormattedMessage,
} from 'gatsby-plugin-intl';
import React from 'react';
import { Tooltip } from 'react-tippy';

import Button from '../Button';

type Props = {
  className?: string;
};

const languageName = {
  en: 'English',
  hu: 'Magyar',
  de: 'Deutsch',
};

export interface IntlContextConsumerProps {
  languages: (keyof typeof languageName)[];
  language: keyof typeof languageName;
}

const LanguageSwitcher = ({ className }: Props) => (
  <div className={classNames('languageSwitcher', className)}>
    <IntlContextConsumer>
      {({ language: currentLocale, languages }: IntlContextConsumerProps) => (
        <Tooltip
          position="top-start"
          trigger="click"
          useContext
          interactive
          theme="light"
          arrow
          distance={16}
          html={
            <ul className="languageSwitcher__list">
              {languages.map((language) => {
                if (currentLocale !== language) {
                  return (
                    <li
                      key={language}
                      onClick={() =>
                        currentLocale !== language
                          ? changeLocale(language)
                          : null
                      }
                      onKeyDown={() =>
                        currentLocale !== language
                          ? changeLocale(language)
                          : null
                      }
                      role="menuitem"
                      tabIndex={0}
                      className="languageSwitcher__item"
                    >
                      <bdi>{languageName[language]}</bdi>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          }
        >
          <Button className="languageSwitcher__button">
            <i className="fa fa-language"></i>
            <span className="languageSwitcher__currentLocale">
              <FormattedMessage id="site.languageNameOnNativeLanguage" />
            </span>
            <i className="fa fa-angle-down"></i>
          </Button>
        </Tooltip>
      )}
    </IntlContextConsumer>
  </div>
);

export default LanguageSwitcher;
