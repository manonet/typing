import React from 'react';
// @ts-ignore
import { FormattedMessage } from 'gatsby-plugin-intl';
import { StaticQuery, graphql } from 'gatsby';

function AppStatiatics() {
  return (
    <StaticQuery
      query={graphql`
        query appStatiaticsQuery {
          dataJson {
            allKeyboards
            allKeyboardLanguages
            allCharacters
            allDeadKeys
          }
        }
      `}
      render={(data) => (
        <div className="appStatistics">
          <div className="appStatistics__item">
            <div className="appStatistics__number">
              {data.dataJson.allKeyboards}
            </div>
            <div className="appStatistics__desc">
              <FormattedMessage id="appStatistics.allKeyboards" />
            </div>
          </div>
          <div className="appStatistics__item">
            <div className="appStatistics__number">
              {data.dataJson.allKeyboardLanguages}
            </div>
            <div className="appStatistics__desc">
              <FormattedMessage id="appStatistics.allKeyboardLanguages" />
            </div>
          </div>
          <div className="appStatistics__item">
            <div className="appStatistics__number">
              {data.dataJson.allCharacters}
            </div>
            <div className="appStatistics__desc">
              <FormattedMessage id="appStatistics.allCharacters" />
            </div>
          </div>
          <div className="appStatistics__item">
            <div className="appStatistics__number">
              {data.dataJson.allDeadKeys}
            </div>
            <div className="appStatistics__desc">
              <FormattedMessage id="appStatistics.allDeadKeys" />
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default AppStatiatics;
