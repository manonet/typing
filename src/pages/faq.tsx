import { Link, FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import { ROUTE_PATH_CONTRIBUTION, ROUTE_PATH_CONTACT } from '../routes';

const FaqPage = () => {
  return (
    <Layout className="faq">
      <SEO title="" />
      <section className="faq__section">
        <div className="container">
          <h2 className="faq__title">
            <FormattedMessage
              id="faq.page.title"
              defaultMessage="Frequently Asked Questions"
            />
          </h2>
          <dl>
            <dt>Mi lett az alőző programmal?</dt>
            <dd>
              A 2021 előtt elérhető prorgam technikai okok miatt nem
              fenntartható. Ha valaki mégis ragaszkodik hozzá, a{' '}
              <a href="http://flash.manonet.org" target="_blank">
                flash.manonet.org/
              </a>{' '}
              cím alatt még eléerhető.
            </dd>
            <dt>Ez a program miért nem működik rendesen?</dt>
            <dd>
              Ez a program fejlesztés alatt áll, folyamatosan próbálom javítani.
              Kérlek, légy türelemmel. Addig is, lehet{' '}
              <Link to={ROUTE_PATH_CONTRIBUTION}>támogatni</Link> vagy{' '}
              <Link to={ROUTE_PATH_CONTACT}>kérdezni</Link>.
            </dd>
            <dt>
              Why there is no translation for my language, or why some of the
              strings are on English?
            </dt>
            <dd>
              Unfortunately, I can not translate the page for every language. My
              dear friends was kind enough to help me out, and translate some.
              Please help, and{' '}
              <Link to={ROUTE_PATH_CONTACT}>report the issues</Link>, or help by
              the{' '}
              <a
                href="https://gitlab.com/zyxneo/typing/-/blob/dev/CONTRIBUTING.md#translations"
                target="_blank"
              >
                translation
              </a>{' '}
              on your own.
            </dd>
            <dt>Azt hiszem, találtam egy hibát... Mit tegyek?</dt>
            <dd>
              Az könnyen lehet, kérlek{' '}
              <Link to={ROUTE_PATH_CONTACT}>jelezd</Link>, hogy kijavíthassam!
            </dd>
            <dt>Miért nem szerepel itt a kérdésem?</dt>
            <dd>
              Mert még nem kérdezték elegen. Kérlek{' '}
              <Link to={ROUTE_PATH_CONTACT}>kérdezz</Link>!
            </dd>
          </dl>
        </div>
      </section>
    </Layout>
  );
};

export default FaqPage;
