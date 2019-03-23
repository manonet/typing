const getOS = function () {
  const { navigator } = window

  const {
    userAgent,
    platform,
    appVersion,
    oscpu,
  } = navigator

  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']

  if (oscpu.indexOf('Mac') !== -1 || appVersion.indexOf('Mac') !== -1 || macosPlatforms.indexOf(platform) !== -1) {
    return 'Mac'
  }
  if (oscpu.indexOf('iOS') !== -1 || iosPlatforms.indexOf(platform) !== -1) {
    return 'iOS'
  }
  if (/Android/.test(userAgent)) {
    return 'Android'
  }
  if (appVersion.indexOf('Win') !== -1 || windowsPlatforms.indexOf(platform) !== -1) {
    return 'Windows'
  }
  if (appVersion.indexOf('Linux') !== -1) {
    return 'Linux'
  }
  if (appVersion.indexOf('X11') !== -1) {
    return 'UNIX'
  }
  return 'unknown'
}

export default getOS
