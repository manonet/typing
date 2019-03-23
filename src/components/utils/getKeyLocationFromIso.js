const getKeyLocationFromIso = function (iso) {
  const matrixRowLetter = iso.substring(0, 1)
  const matrixColumnNumber = parseInt(iso.substring(1, 3), 10)
  const leftOrRightSide = (matrixColumnNumber > 5 && matrixColumnNumber < 99) ? 'right' : 'left'

  return {
    matrixRowLetter,
    matrixColumnNumber,
    leftOrRightSide,
  }
}

export default getKeyLocationFromIso
