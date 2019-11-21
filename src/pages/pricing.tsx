import React from 'react';
// @ts-ignore
import { FormattedMessage, FormattedNumber } from 'gatsby-plugin-intl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/layout';
import Link from '../components/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pricing: {
      display: 'flex',
      justifyContent: 'space-around',
      margin: '20px 0',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      flex: '0 0 22%',
      textAlign: 'center',
      backgroundColor: theme.palette.grey[900],
      overflow: 'hidden',
      padding: '20px',
    },
    title: {
      fontSize: '32px',
      lineHeight: '32px',
    },
    cardPrice: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flexBasis: '100px',
    },
    price: {
      fontFamily: "'Roboto Slab', serif",
      fontSize: '20px',
      lineHeight: '20px',
      fontWeight: 900,
    },
    discount: {
      color: theme.palette.secondary.main,
    },
    reducedPrice: {
      fontFamily: "'Roboto Slab', serif",
      color: theme.palette.secondary.main,
      fontSize: '28px',
      lineHeight: '28px',
      fontWeight: 900,
    },
    benefits: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    item: {
      padding: '10px',
      margin: 0,
      borderBottom: `1px solid ${theme.palette.grey[500]}`,
      '&:last-child': {
        borderBottom: 0,
      },
    },
    subscribe: {
      marginTop: 'auto',
      paddingTop: '16px',
    },
  })
);

function PricingPage() {
  const classes = useStyles();

  return (
    <Layout>
      <Typography variant="h2" gutterBottom>
        <FormattedMessage id="pricing.page.title" />
      </Typography>
      <div className={classes.pricing}>
        <div className={classes.card}>
          <h3 className={classes.title}>
            <FormattedMessage id="pricing.licence.mini" />
          </h3>
          <div className={classes.cardPrice}>
            <FormattedMessage
              id="pricing.pricePerMonth"
              values={{
                price: (
                  <div className={classes.price}>
                    <FormattedNumber
                      value={0}
                      style="currency"
                      currency={'EUR'}
                      minimumFractionDigits={0}
                      maximumFractionDigits={0}
                    />
                  </div>
                ),
              }}
            />
          </div>
          <ul className={classes.benefits}>
            <li className={classes.item}>
              <FormattedMessage id="pricing.benefit.1" />
            </li>
          </ul>
          <div className={classes.subscribe}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/typewriter/"
            >
              <FormattedMessage id="pricing.callToAction" />
            </Button>
          </div>
        </div>

        <div className={classes.card}>
          <h3 className={classes.title}>
            <FormattedMessage id="pricing.licence.small" />
          </h3>
          <div className={classes.cardPrice}>
            <FormattedMessage
              id="pricing.pricePerMonth"
              values={{
                price: (
                  <>
                    <div className={classes.price}>
                      <s>
                        <FormattedNumber
                          value={4}
                          style="currency"
                          currency={'EUR'}
                          minimumFractionDigits={0}
                          maximumFractionDigits={0}
                        />
                      </s>
                    </div>

                    <div className={classes.discount}>
                      <FormattedMessage id="pricing.discount.limited" />
                    </div>

                    <div className={classes.reducedPrice}>
                      <FormattedNumber
                        value={0}
                        style="currency"
                        currency={'EUR'}
                        minimumFractionDigits={0}
                        maximumFractionDigits={0}
                      />
                    </div>
                  </>
                ),
              }}
            />
          </div>
          <ul className={classes.benefits}>
            <li className={classes.item}>
              <FormattedMessage id="pricing.benefit.1" />
            </li>
          </ul>
          <div className={classes.subscribe}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/typewriter/"
            >
              <FormattedMessage id="pricing.callToAction" />
            </Button>
          </div>
        </div>

        <div className={classes.card}>
          <h3 className={classes.title}>
            <FormattedMessage id="pricing.licence.medium" />
          </h3>
          <div className={classes.cardPrice}>
            <FormattedMessage
              id="pricing.pricePerMonth"
              values={{
                price: (
                  <>
                    <div className={classes.price}>
                      <s>
                        <FormattedNumber
                          value={19}
                          style="currency"
                          currency={'EUR'}
                          minimumFractionDigits={0}
                          maximumFractionDigits={0}
                        />
                      </s>
                    </div>

                    <div className={classes.discount}>
                      <FormattedMessage id="pricing.discount.limited" />
                    </div>

                    <div className={classes.reducedPrice}>
                      <FormattedNumber
                        value={0}
                        style="currency"
                        currency={'EUR'}
                        minimumFractionDigits={0}
                        maximumFractionDigits={0}
                      />
                    </div>
                  </>
                ),
              }}
            />
          </div>
          <ul className={classes.benefits}>
            <li className={classes.item}>
              <FormattedMessage id="pricing.benefit.1" />
            </li>
          </ul>
          <div className={classes.subscribe}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/typewriter/"
            >
              <FormattedMessage id="pricing.callToAction" />
            </Button>
          </div>
        </div>

        <div className={classes.card}>
          <h3 className={classes.title}>
            <FormattedMessage id="pricing.licence.large" />
          </h3>
          <div className={classes.cardPrice}>
            <FormattedMessage
              id="pricing.pricePerMonth"
              values={{
                price: (
                  <>
                    <div className={classes.price}>
                      <s>
                        <FormattedNumber
                          value={99}
                          style="currency"
                          currency={'EUR'}
                          minimumFractionDigits={0}
                          maximumFractionDigits={0}
                        />
                      </s>
                    </div>

                    <div className={classes.discount}>
                      <FormattedMessage id="pricing.discount.limited" />
                    </div>

                    <div className={classes.reducedPrice}>
                      <FormattedNumber
                        value={0}
                        style="currency"
                        currency={'EUR'}
                        minimumFractionDigits={0}
                        maximumFractionDigits={0}
                      />
                    </div>
                  </>
                ),
              }}
            />
          </div>
          <ul className={classes.benefits}>
            <li className={classes.item}>
              <FormattedMessage id="pricing.benefit.1" />
            </li>
          </ul>
          <div className={classes.subscribe}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/typewriter/"
            >
              <FormattedMessage id="pricing.callToAction" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PricingPage;
