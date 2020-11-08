import { Button } from 'antd';
import { StaticQuery, graphql, navigate, Link } from 'gatsby';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import imgTestimonials1 from '../images/testimonials1.jpg';
import imgTestimonials2 from '../images/testimonials2.jpg';
import imgTypewriter from '../images/typewriter.png';
import imgSam from '../images/uncle-sam.png';

const startNowButton = (
  <Button
    className="startNowButton"
    type="primary"
    size="large"
    onClick={() => {
      if (typeof window !== 'undefined') {
        navigate('/typewriter');
      }
    }}
  >
    <FormattedMessage id="button.startNow" />
  </Button>
);

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query SiteNameQuery {
        site {
          siteMetadata {
            name
          }
        }
      }
    `}
    render={(data) => (
      <Layout className="home" hasHeader={false}>
        <SEO title="Manonet" />

        <section className="home__intro">
          <div className="container intro">
            <div className="intro__logo">{data.site.siteMetadata.name}</div>
            <h1 className="intro__title">
              <FormattedMessage id="home.intro.confident" />
            </h1>

            <div className="intro__desc">
              <FormattedMessage id="site.description" />
              {' - '}
              <FormattedMessage id="site.underDevelopement" />
            </div>

            <div className="intro__advantages">
              <div className="container advantages">
                <ul>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <FormattedMessage id="home.intro.pro1" />
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <FormattedMessage id="home.intro.pro2" />
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <FormattedMessage id="home.intro.pro3" />
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <FormattedMessage id="home.intro.pro4" />
                  </li>
                </ul>
                {startNowButton}
              </div>

              <img className="intro__image" src={imgTypewriter} alt="" />
            </div>
          </div>
        </section>

        <section className="home__features">
          <div className="container features">
            <h2 className="features__title">
              <FormattedMessage id="home.features.title" />
            </h2>
            <div className="features__list">
              <div className="features__item">
                <i className="far fa-keyboard"></i>
                <div className="features__itemWrapper">
                  <h3>
                    <FormattedMessage id="home.features.keyboard.title" />
                  </h3>
                  <div>
                    <FormattedMessage id="home.features.keyboard.desc" />
                  </div>
                </div>
              </div>

              <div className="features__item">
                <i className="fas fa-balance-scale"></i>
                <div className="features__itemWrapper">
                  <h3>
                    <FormattedMessage id="home.features.metronome.title" />
                  </h3>
                  <div>
                    <FormattedMessage id="home.features.metronome.desc" />
                  </div>
                </div>
              </div>

              <div className="features__item">
                <i className="fas fa-language"></i>
                <div className="features__itemWrapper">
                  <h3>
                    <FormattedMessage id="home.features.characters.title" />
                  </h3>
                  <div>
                    <FormattedMessage id="home.features.characters.desc" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home__testimonials">
          <div className="container testimonials">
            <h2 className="testimonials__title">
              <FormattedMessage
                id="home.testimonials.title"
                values={{ siteName: data.site.siteMetadata.name }}
              />
            </h2>
            <div className="testimonials__list">
              <div className="testimonials__item">
                <div className="testimonials__picture">
                  <img src={imgTestimonials1} alt="" />
                </div>
                <div className="testimonials__user">Tóth Zoltán</div>
                <div className="testimonials__desc">
                  <FormattedMessage id="home.testimonials.desc1" />
                </div>
              </div>
              <div className="testimonials__item">
                <div className="testimonials__picture">
                  <img src={imgTestimonials2} alt="" />
                </div>
                <div className="testimonials__user">Judit</div>
                <div className="testimonials__desc">
                  <FormattedMessage
                    id="home.testimonials.desc2"
                    values={{ siteName: data.site.siteMetadata.name }}
                  />
                </div>
              </div>
              <div className="testimonials__item">
                <div className="testimonials__picture">
                  <img src={imgSam} alt="" />
                </div>
                <div className="testimonials__user">
                  <FormattedMessage id="home.testimonials.generic.user" />
                </div>
                <div className="testimonials__desc">
                  <FormattedMessage id="home.testimonials.generic.desc" />
                </div>
                <div className="testimonials__feedback">
                  <Link to="/contact">
                    <i className="far fa-comment-dots"></i>
                    <FormattedMessage id="home.testimonials.feedback" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home__startToday">
          <div className="container startToday">
            <h2 className="startToday__title">
              <FormattedMessage id="home.startNow.title" />
            </h2>
            <div className="startToday__desc">
              <FormattedMessage
                id="home.startNow.desc"
                values={{ siteName: data.site.siteMetadata.name }}
              />{' '}
              <Link to="/contribution">
                <FormattedMessage id="home.learn.more" />
              </Link>
            </div>
            {startNowButton}
          </div>
        </section>
      </Layout>
    )}
  />
);

export default IndexPage;
