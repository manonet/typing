/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 *
 * WARNING: The following code is taken from the react-intl docs.
 *
 * @link https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl
 */

import { mount, shallow } from 'enzyme';
import React from 'react';
import { IntlProvider, createIntl } from 'react-intl';

// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
const messages = require('../intl/en.json'); // en.json

const timeZone = 'UTC';

// Create the IntlProvider to retrieve context for wrapping around.
const intl = createIntl({
  defaultLocale: 'en',
  locale: 'en',
  messages,
  timeZone,
});

export { intl };

// en.json
const defaultLocale = 'en';
const locale = defaultLocale;

export function mountWithIntl<T>(node: React.ReactElement) {
  return mount<T>(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      defaultLocale,
      locale,
      messages,
      timeZone,
    },
  });
}

export function shallowWithIntl<T>(node: React.ReactElement) {
  return shallow<T>(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      defaultLocale,
      locale,
      messages,
      timeZone,
    },
  });
}
