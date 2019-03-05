
import KeyboardProcessXML from './KeyboardProcessXML'

export default function KeyboardLoadXML(props, callback) {
  fetch(props.keyboardUrl)
    .then(response => response.text())
    .then((response) => {
      const keyboardObj = KeyboardProcessXML(response)
      callback(keyboardObj)
    }, (error) => {
    // TODO
      alert(error.message)
    })
}
