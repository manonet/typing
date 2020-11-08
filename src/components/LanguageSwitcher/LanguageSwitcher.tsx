import Tippy from '@tippyjs/react';
import { Button, Space } from 'antd';
import classNames from 'classnames';
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';
import React from 'react';

type Props = {
  className?: string;
};

const languageName = {
  ar: 'العربية', // Arabic
  bg: 'Български', // Bulgarian
  bs: 'Bosanski', // Bosnian
  ca: 'Català', // Catalan
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
        <Space className="languageSwitcher__list">
          {languages.map((language) => {
            if (currentLocale !== language) {
              return (
                <Button
                  key={language}
                  onClick={() =>
                    currentLocale !== language ? changeLocale(language) : null
                  }
                  onKeyDown={() =>
                    currentLocale !== language ? changeLocale(language) : null
                  }
                  role="menuitem"
                  tabIndex={0}
                  className="languageSwitcher__item"
                  type="link"
                  size="small"
                >
                  <bdi>{languageName[language]}</bdi>
                </Button>
              );
            }
            return null;
          })}
        </Space>
      )}
    </IntlContextConsumer>
  </div>
);

export default LanguageSwitcher;
