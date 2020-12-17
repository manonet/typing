import { FormattedDate } from 'gatsby-plugin-intl';
import React, { useState, useEffect } from 'react';

import useFirebase from '../../utils/useFirebase';

type UserProfile = {
  displayName: string;
  email: string;
  emailVerified: boolean;
  metadata?: {
    creationTime: number;
    lastSignInTime: number;
  };
  phoneNumber?: string;
};

export default function UserProfile() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({} as UserProfile);

  const firebase = useFirebase();

  useEffect(() => {
    if (!firebase) return;
    // @ts-ignore
    return firebase.auth().onAuthStateChanged((user: any) => {
      setIsSignedIn(!!user);
      setUser(user as UserProfile);
    });
  }, [firebase]);

  if (firebase && isSignedIn) {
    return (
      <div>
        <p>displayName: {user.displayName}</p>
        <p>email: {user.email}</p>
        <p>emailVerified: {user.emailVerified ? 'yes' : 'no'}</p>
        <p>phoneNumber: {user.phoneNumber}</p>
        {user.metadata && (
          <>
            <p>
              metadata.creationTime:{' '}
              <FormattedDate
                value={user.metadata.creationTime}
                day="numeric"
                month="long"
                year="numeric"
                hour="numeric"
                minute="numeric"
              />
            </p>
            <p>
              metadata.lastSignInTime:{' '}
              <FormattedDate
                value={user.metadata.lastSignInTime}
                day="numeric"
                month="long"
                year="numeric"
                hour="numeric"
                minute="numeric"
              />
            </p>
          </>
        )}
      </div>
    );
  }

  return null;
}
