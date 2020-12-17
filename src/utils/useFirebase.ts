// see: https://invertase.io/blog/firebase-with-gatsby

import { useEffect, useState } from 'react';

import getFirebase from './firebase';

export default function useFirebase() {
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    setInstance(getFirebase());
  }, []);

  return instance;
}
