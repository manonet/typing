import { Button } from 'antd';
import originalFirebase from 'firebase';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import useFirebase from '../utils/useFirebase';

const LoginPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const firebase = useFirebase();

  useEffect(() => {
    if (!firebase) return;
    // @ts-ignore
    return firebase.auth().onAuthStateChanged((user: any) => {
      setIsSignedIn(!!user);
    });
  }, [firebase]);

  function getContent() {
    if (firebase) {
      if (isSignedIn) {
        return (
          <div>
            {
              // @ts-ignore
              renderProfile(firebase.auth().currentUser)
            }
            <Button
              onClick={
                // @ts-ignore
                () => firebase.auth().signOut()
              }
            >
              <FormattedMessage id="site.logout" defaultMessage="Sign-out" />
            </Button>
          </div>
        );
      } else {
        // Configure FirebaseUI.
        const uiConfig = {
          // Popup signin flow rather than redirect flow.
          signInFlow: 'popup',
          // We will display Google and Facebook as auth providers.
          signInOptions: [
            originalFirebase.auth.EmailAuthProvider.PROVIDER_ID,
            originalFirebase.auth.GoogleAuthProvider.PROVIDER_ID,
            originalFirebase.auth.FacebookAuthProvider.PROVIDER_ID,
          ],
          // callbacks: {
          //   // Avoid redirects after sign-in.
          //   signInSuccessWithAuthResult: () => false,
          // },
          signInSuccessUrl: '/typewriter',
        };
        return (
          <div>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={
                // @ts-ignore
                firebase.auth()
              }
            />
          </div>
        );
      }
    }
  }

  return (
    <Layout className="contact">
      <SEO title="" />
      <section className="contactForm__section">
        <div className="container">
          <h2 className="contact__title">
            <FormattedMessage id="site.login" defaultMessage="Login" />
          </h2>
          <div>{getContent()}</div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
