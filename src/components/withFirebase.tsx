import { FirebaseContext } from 'gatsby-plugin-firebase';
import React from 'react';

export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);
