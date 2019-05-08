const getKeyLocationFromIso = function (iso) {
  const matrixRowLetter = iso.substring(0, 1)
  const matrixColumnNumber = parseInt(iso.substring(1, 3), 10)
  const side = (matrixColumnNumber > 5 && matrixColumnNumber < 99) ? 'Right' : 'Left'

  return {
    matrixRowLetter,
    matrixColumnNumber,
    side,
  }
}

export default getKeyLocationFromIso
