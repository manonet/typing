import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import React from 'react';
import { connect } from 'react-redux';

import { Layout, SEO } from '@components';
import { State as ReduxState } from '@reducers';

type Props = {
  allChars: {
    glyph: string;
    correct: string;
    miswrite: string;
    misread: string;
  }[];
  layout: any;
  layoutName: any;
};

function StatisticsPage(props: Props) {
  const intl = useIntl();
  const { locale } = intl;
  const { allChars, layout, layoutName } = props;

  allChars.sort((a, b) =>
    a.glyph.localeCompare(b.glyph, locale, {
      sensitivity: 'base',
      numeric: true,
    })
  );

  return (
    <Layout>
      <SEO title={intl.formatMessage({ id: 'site.navigation.statistics' })} />
      <h2>
        <FormattedMessage id="site.navigation.statistics" />
      </h2>
      <div className="statistics">
        <div>Layout: {layout}</div>
        <div>Layout Name: {layoutName}</div>
        <div className="statistics__allChars allChars">
          {allChars.map((char) => {
            return (
              <div className="allChars__char" key={char.glyph}>
                <span className="allChars__glyph">{char.glyph}</span>
                <div className="allChars__details">
                  <span className="allChars__correct">
                    all: {char.correct + char.miswrite}
                  </span>
                  <span className="allChars__correct">
                    correct: {char.correct}
                  </span>
                  <span className="allChars__miswrite">
                    miswrite: {char.miswrite}
                  </span>
                  <span className="allChars__miswrite">
                    misread: {char.misread}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <Keyboard className={'TypewriterBoard__keyboard'} /> */}
    </Layout>
  );
}

const mapStateToProps = (state: ReduxState) => {
  const { typing } = state;
  return {
    layout: typing.layout,
    layoutName: typing.name,
    allChars: typing.allChars,
    keys: typing.keys,
  };
};

export default connect(mapStateToProps, null)(StatisticsPage);
