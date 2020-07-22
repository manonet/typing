import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import {
  IntlContextConsumer,
  changeLocale,
  FormattedMessage,
} from 'gatsby-plugin-intl';
import React from 'react';

import Button from '../Button';

type Props = {
  className?: string;
};

const languageName = {
  ar: 'العربية', // Arabic
  bg: 'Български', // Bulgarian
  bs: 'Bosanski', // Bosnian
  cs: 'Čeština', // Czech
  da: 'Dansk', // Danish
  de: 'Deutsch', // German
  el: 'Ελληνικά', // Greek
  en: 'English',
  es: 'Español', // Spanish
  et: 'Eesti', // Estonian
  fa: 'فارسی', // Persian
  fi: 'Suomi', // Finnish
  fr: 'Français', // French
  hi: 'हिन्दी', // Hindi
  hr: 'Hrvatski', // Croatian
  hu: 'Magyar', // Hungarian
  it: 'Italiano', // Italian
  ja: '日本語', // Japanese
  lt: 'Lietuvių', // Lithuanian
  lv: 'Latviešu', // Latvian
  mk: 'Македонски', // Macedonian
  ml: 'മലയാളം', // Malayalam
  nl: 'Nederlands', // Dutch
  pa: 'ਪੰਜਾਬੀ', // Punjabi
  pl: 'Polski', // Polish
  pt: 'Português', // Portuguese
  'pt-br': 'Português (BR)', // Brazilian
  ro: 'Română', // Romanian
  ru: 'Русский', // Russian
  sk: 'Slovenčina', // Slovak
  sl: 'Slovenščina', // Slovenian
  sq: 'Shqip', // Albanian
  sr: 'Српски / srpski', // Serbian
  sv: 'Svenska', // Swedish
  te: 'తెలుగు', // Telugu
  tr: 'Türkçe', // Turkish
  uk: 'Українська', // Ukrainian
  zh: '中文', // Chinese
};

export interface IntlContextConsumerProps {
  languages: (keyof typeof languageName)[];
  language: keyof typeof languageName;
}

const LanguageSwitcher = ({ className }: Props) => (
  <div className={classNames('languageSwitcher', className)}>
    <IntlContextConsumer>
      {({ language: currentLocale, languages }: IntlContextConsumerProps) => (
        <Tippy
          placement="top-start"
          trigger="click"
          interactive
          theme="light"
          arrow
          content={
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
        </Tippy>
      )}
    </IntlContextConsumer>
  </div>
);

export default LanguageSwitcher;
