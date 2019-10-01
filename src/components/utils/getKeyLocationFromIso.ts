import { ISO } from '../../types';

const getKeyLocationFromIso = function(iso: ISO) {
  const matrixColumnNumber = parseInt(iso.substring(1, 3), 10);
  const side =
    matrixColumnNumber > 5 && matrixColumnNumber < 99 ? 'Right' : 'Left';

  return {
    side,
  };
};

export default getKeyLocationFromIso;