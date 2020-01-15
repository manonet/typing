import React from 'react';
// @ts-ignore
import { FormattedMessage, FormattedNumber } from 'gatsby-plugin-intl';
import Button from '../components/Button';

import Layout from '../components/Layout';
import Link from '../components/Link';

import './pricing.scss';

function PricingPage() {
  return (
    <Layout>
      <h2>
        <FormattedMessage id="pricing.page.title" />
      </h2>
      <div className="pricing">
        <div className="pricing__card">
          <div className="pricing__title">
            <FormattedMessage id="pricing.licence.mini" />
          </div>
          <div className="pricing__cardPrice">
            <FormattedMessage
              id="pricing.pricePerMonth"
              values={{
                price: (
                  <div className="pricing__price">
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
          <ul className="pricing__benefits">
            <li className="pricing__item">
              <FormattedMessage id="pricing.benefit.1" />
            </li>
          </ul>
          <div className="pricing__subscribe">
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

        <div className="pricing__card">
          <div className="pricing__title">
            <FormattedMessage id="pricing.licence.small" />
          </div>
          <div className="pricing__cardPrice">
            <FormattedMessage
              id="pricing.pricePerMonth"
              values={{
                price: (
                  <>
                    <div className="pricing__price">
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

                    <div className="pricing__discount">
                      <FormattedMessage id="pricing.discount.limited" />
                    </div>

                    <div className="pricing__reducedPrice">
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
          <ul className="pricing__benefits">
            <li className="pricing__item">
              <FormattedMessage id="pricing.benefit.1" />
            </li>
          </ul>
          <div className="pricing__subscribe">
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

        <div className="pricing__card">
          <div className="pricing__title">
            <FormattedMessage id="pricing.licence.medium" />
          </div>
          <div className="pricing__cardPrice">
            <FormattedMessage
              id="pricing.pricePerMonth"
              values={{
                price: (
                  <>
                    <div className="pricing__price">
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

                    <div className="pricing__discount">
                      <FormattedMessage id="pricing.discount.limited" />
                    </div>

                    <div className="pricing__reducedPrice">
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
          <ul className="pricing__benefits">
            <li className="pricing__item">
              <FormattedMessage id="pricing.benefit.1" />
            </li>
          </ul>
          <div className="pricing__subscribe">
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

        <div className="pricing__card">
          <div className="pricing__title">
            <FormattedMessage id="pricing.licence.large" />
          </div>
          <div className="pricing__cardPrice">
            <FormattedMessage
              id="pricing.pricePerMonth"
              values={{
                price: (
                  <>
                    <div className="pricing__price">
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

                    <div className="pricing__discount">
                      <FormattedMessage id="pricing.discount.limited" />
                    </div>

                    <div className="pricing__reducedPrice">
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
          <ul className="pricing__benefits">
            <li className="pricing__item">
              <FormattedMessage id="pricing.benefit.1" />
            </li>
          </ul>
          <div className="pricing__subscribe">
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
