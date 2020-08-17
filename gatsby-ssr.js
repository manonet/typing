/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/messaging';

import wrapWithProvider from './src/state/ReduxWrapper';
// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = wrapWithProvider;
