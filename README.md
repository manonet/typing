[![pipeline status](https://gitlab.com/zyxneo/typing/badges/dev/pipeline.svg?style=flat)](https://gitlab.com/zyxneo/typing/commits/dev)
[![coverage report](https://gitlab.com/zyxneo/typing/badges/dev/coverage.svg?style=flat)](https://gitlab.com/zyxneo/typing/commits/dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![GitHub last commit](https://img.shields.io/github/last-commit/manonet/typing.svg?style=flat)](https://gitlab.com/zyxneo/typing/-/commits/dev)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/manonet/typing.svg?style=flat)](package.json)

# Manonet Typewriter Program

Prototype: [http://beta.manonet.org](http://beta.manonet.org)
[![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m784822203-4a75e480b59a8468777aa7de.svg?style=flat)](https://uptimerobot.com/dashboard#784822203)
[![Website](https://img.shields.io/website?url=http%3A%2F%2Fbeta.manonet.org?style=flat)](http://beta.manonet.org)

This is a [React](https://reactjs.org/) app made with [Gatsby](https://www.gatsbyjs.org/) framework.
[![devDependencies Status](https://david-dm.org/manonet/typing/dev-status.svg?style=flat)](https://david-dm.org/manonet/typing?type=dev)

## Contributing

If you are interested in reporting/fixing issues and contributing directly to the code base, please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

---

### Links

- <https://en.wikipedia.org/wiki/ISO/IEC_9995>
- <http://www.unicode.org/reports/tr35/tr35-49/tr35-keyboards.html>
- <https://unicode.org/reports/tr35/tr35-keyboards.html>
- <https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState>

### Caveats

Things which makes a typewriter app complicated

Because some browsers choose to interpret physical keys differently, there are some differences in which keys map to which codes. ...On Mac OS X, it's hard to get scancode or something which can distinguish a physical key from a key event. Therefore, Gecko always maps code value from the virtual keycode. [KeyboardEvent: code values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)
