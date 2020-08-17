/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/messaging';

import './src/styles/global.scss';
import wrapWithProvider from './src/state/ReduxWrapper';
// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = wrapWithProvider;
