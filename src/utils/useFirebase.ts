// see: https://invertase.io/blog/firebase-with-gatsby

import { useEffect, useState } from 'react';

import getFirebase from './firebase';

// TODO - I am unable to export this function in any other way...(ง'̀-'́)ง
// Why import useFirebase from '@utils'; does not work??? It says
// WebpackError: ReferenceError: fetch is not defined
export default function useFirebase() {
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    setInstance(getFirebase());
  }, []);

  return instance;
}
