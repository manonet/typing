import React from 'react';
// @ts-ignore
import { FormattedMessage } from 'gatsby-plugin-intl';
import { StaticQuery, graphql } from 'gatsby';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appStatistics: {
      display: 'flex',
      justifyContent: 'space-around',
      margin: '20px 0',
    },
    item: {
      flex: '0 0 20%',
      textAlign: 'center',
      backgroundColor: theme.palette.grey[900],
      overflow: 'hidden',
      padding: '20px',
    },
    number: {
      fontSize: '56px',
      lineHeight: '56px',
      fontWeight: 900,
    },
    desc: {},
  })
);

function AppStatiatics() {
  const classes = useStyles();

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
        <div className={classes.appStatistics}>
          <div className={classes.item}>
            <div className={classes.number}>{data.dataJson.allKeyboards}</div>
            <div className={classes.desc}>
              <FormattedMessage id="appStatistics.allKeyboards" />
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.number}>
              {data.dataJson.allKeyboardLanguages}
            </div>
            <div className={classes.desc}>
              <FormattedMessage id="appStatistics.allKeyboardLanguages" />
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.number}>{data.dataJson.allCharacters}</div>
            <div className={classes.desc}>
              <FormattedMessage id="appStatistics.allCharacters" />
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.number}>{data.dataJson.allDeadKeys}</div>
            <div className={classes.desc}>
              <FormattedMessage id="appStatistics.allDeadKeys" />
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default AppStatiatics;
