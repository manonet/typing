import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Keyboard from '../components/Keyboard';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { State as ReduxState } from '../reducers';

function StatisticsPage(props) {
  const intl = useIntl();
  const { locale } = intl;
  const { allChars, keys, layout, layoutName } = props;

  allChars.sort((a, b) =>
    a.glyph.localeCompare(b.glyph, locale, {
      sensitivity: 'base',
      numeric: true,
    })
  );

  return (
    <Layout>
      <SEO
        lang={locale}
        title={intl.formatMessage({ id: 'site.navigation.statistics' })}
      />
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
      <Keyboard className={'TypewriterBoard__keyboard'} />
    </Layout>
  );
}

const mapStateToProps = (state: ReduxState) => {
  const { focusUserInput, typing } = state;
  return {
    layout: typing.layout,
    layoutName: typing.name,
    allChars: typing.allChars,
    keys: typing.keys,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    ReduxState,
    undefined,
    SetSampleTextAction | KeyboardAction
  >
) => ({
  dispatchSetSampleText: (sampleText: string) =>
    dispatch(setSampleText(sampleText)),
  dispatchKeyDown: (event) => dispatch(keyDown(event)),
  dispatchKeyUp: (event) => dispatch(keyUp(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);