import { Button, Space } from 'antd';
import classNames from 'classnames';
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl';
import React from 'react';

import { languageName } from '@intl/languages';

type Props = {
  className?: string;
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
