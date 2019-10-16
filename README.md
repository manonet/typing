# Manonet Typewriter Program

This is a React app made with [Gatsby](https://www.gatsbyjs.org/) framework.

### Links

* https://en.wikipedia.org/wiki/ISO/IEC_9995
* http://www.unicode.org/reports/tr35/tr35-49/tr35-keyboards.html
* https://unicode.org/reports/tr35/tr35-keyboards.html
* https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState

### Caveats

Things which makes a typewriter app complicated

Because some browsers choose to interpret physical keys differently, there are some differences in which keys map to which codes. ...On Mac OS X, it's hard to get scancode or something which can distinguish a physical key from a key event. Therefore, Gecko always maps code value from the virtual keycode. [KeyboardEvent: code values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)

