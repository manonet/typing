import { Button } from 'antd';
import { StaticQuery, graphql, navigate, Link } from 'gatsby';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React, { useState, useEffect } from 'react';

import { Layout, SEO } from '@components';
import imgTestimonials1 from '@images/testimonials1.jpg';
import imgTestimonials2 from '@images/testimonials2.jpg';
import imgTypewriter from '@images/typewriter.png';
import imgSam from '@images/uncle-sam.jpg';
import {
  ROUTE_PATH_LOGIN,
  ROUTE_PATH_TYPEWRITER,
  ROUTE_PATH_CONTACT,
  ROUTE_PATH_CONTRIBUTION,
} from '@routes';
import useFirebase from '@utils/useFirebase';

const IndexPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const firebase = useFirebase();

  useEffect(() => {
    if (!firebase) return;
    // @ts-ignore
    return firebase.auth().onAuthStateChanged((user: any) => {
      setIsSignedIn(!!user);
    });
  }, [firebase]);

  function startNowButton() {
    return (
      <Button
        className="startNowButton"
        type="primary"
        size="large"
        onClick={() => {
          if (typeof window !== 'undefined') {
            navigate(isSignedIn ? ROUTE_PATH_TYPEWRITER : ROUTE_PATH_LOGIN);
          }
        }}
      >
        <FormattedMessage id="button.startNow" defaultMessage="Start Now" />
      </Button>
    );
  }

  return (
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
        <Layout className="home">
          <SEO title="Manonet" />

          <section className="home__intro">
            <div className="container intro">
              <div className="intro__logo">{data.site.siteMetadata.name}</div>
              <h1 className="intro__title">
                <FormattedMessage
                  id="home.intro.confident"
                  defaultMessage="Type with confident"
                />
              </h1>

              <div className="intro__desc">
                <FormattedMessage
                  id="site.description"
                  defaultMessage="Free online touch typing exercises. Learn to type properly, increase your typing skills and boost your typing speed."
                />
                {' - '}
                <FormattedMessage
                  id="site.underDevelopement"
                  defaultMessage="Under development"
                />
              </div>

              <div className="intro__advantages">
                <div className="container advantages">
                  <ul>
                    <li>
                      <i className="far fa-check-circle"></i>
                      <FormattedMessage
                        id="home.intro.pro1"
                        defaultMessage="Simple, free, online, touch typing tutorials."
                      />
                    </li>
                    <li>
                      <i className="far fa-check-circle"></i>
                      <FormattedMessage
                        id="home.intro.pro2"
                        defaultMessage="Lessons in English, in almost endless quantities ..."
                      />
                    </li>
                    <li>
                      <i className="far fa-check-circle"></i>
                      <FormattedMessage
                        id="home.intro.pro3"
                        defaultMessage="Set your modes the way you like! Learn according to your own needs!"
                      />
                    </li>
                    <li>
                      <i className="far fa-check-circle"></i>
                      <FormattedMessage
                        id="home.intro.pro4"
                        defaultMessage="Make individual exercises, practice your own texts!"
                      />
                    </li>
                  </ul>
                  {startNowButton()}
                </div>

                <img className="intro__image" src={imgTypewriter} alt="" />
              </div>
            </div>
          </section>

          <section className="home__features">
            <div className="container features">
              <h2 className="features__title">
                <FormattedMessage
                  id="home.features.title"
                  defaultMessage="Features"
                />
              </h2>
              <div className="features__list">
                <div className="features__item">
                  <i className="far fa-keyboard"></i>
                  <div className="features__itemWrapper">
                    <h3>
                      <FormattedMessage
                        id="home.features.keyboard.title"
                        defaultMessage="Keyboard"
                      />
                    </h3>
                    <div>
                      <FormattedMessage
                        id="home.features.keyboard.desc"
                        defaultMessage="The keyboard on the screen keeps you updated about every necessary information. No need to look down while typing."
                      />
                    </div>
                  </div>
                </div>

                <div className="features__item">
                  <i className="fas fa-balance-scale"></i>
                  <div className="features__itemWrapper">
                    <h3>
                      <FormattedMessage
                        id="home.features.metronome.title"
                        defaultMessage="Metronome"
                      />
                    </h3>
                    <div>
                      <FormattedMessage
                        id="home.features.metronome.desc"
                        defaultMessage="The built-in metronome helps you too keep focus on a moderate tempo. This way you do not have to hurry, but also keep a nice progress"
                      />
                    </div>
                  </div>
                </div>

                <div className="features__item">
                  <i className="fas fa-language"></i>
                  <div className="features__itemWrapper">
                    <h3>
                      <FormattedMessage
                        id="home.features.characters.title"
                        defaultMessage="All characters"
                      />
                    </h3>
                    <div>
                      <FormattedMessage
                        id="home.features.characters.desc"
                        defaultMessage="We help you to fully discover your keyboard and get to know all characters which you able to type. You will be suprised..."
                      />
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
                  defaultMessage="Why users love {siteName}"
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
                    <FormattedMessage
                      id="home.testimonials.desc1"
                      defaultMessage="I didn't plan to learn touch typing. After a pub night sometime in February, I stumbled upon it. I tried it out, and I got stuck, addicted. ...Today I type with 160 BPM and 3-4 error percent, but I write with confidence and I really enjoy it."
                    />
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
                      defaultMessage="Congratulations on the {siteName} typing program, very witty! I giggle good at trying to master 10 fingers typing tricks. I have given up {siteName} several times before because I came across amazingly boring typing programs. The manonet, on the other hand, is brilliant."
                      values={{ siteName: data.site.siteMetadata.name }}
                    />
                  </div>
                </div>
                <div className="testimonials__item">
                  <div className="testimonials__picture">
                    <img src={imgSam} alt="" />
                  </div>
                  <div className="testimonials__user">
                    <FormattedMessage
                      id="home.testimonials.generic.user"
                      defaultMessage="Maybe Your Name?"
                    />
                  </div>
                  <div className="testimonials__desc">
                    <FormattedMessage
                      id="home.testimonials.generic.desc"
                      defaultMessage="Are you a famous person like Madonna or Obama? No problem if not, we're welcome your feedback, and we may even share it with everyone here."
                    />
                  </div>
                  <div className="testimonials__feedback">
                    <Link to={ROUTE_PATH_CONTACT}>
                      <i className="far fa-comment-dots"></i>
                      <FormattedMessage
                        id="home.testimonials.feedback"
                        defaultMessage="Tell your opinion"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="home__startToday">
            <div className="container startToday">
              <h2 className="startToday__title">
                <FormattedMessage
                  id="home.startNow.title"
                  defaultMessage="Start now — it's free"
                />
              </h2>
              <div className="startToday__desc">
                <FormattedMessage
                  id="home.startNow.desc"
                  defaultMessage="{siteName} is an open source, community driven application. We accept donations, but you do not have pay for using the app. We also plan to make and offer payed features to cover expenses, but even these you can get for a bit of a conrtibution."
                  values={{ siteName: data.site.siteMetadata.name }}
                />{' '}
                <Link to={ROUTE_PATH_CONTRIBUTION}>
                  <FormattedMessage
                    id="home.learn.more"
                    defaultMessage="Learn more"
                  />
                </Link>
              </div>
              {startNowButton()}
            </div>
          </section>
        </Layout>
      )}
    />
  );
};

export default IndexPage;
