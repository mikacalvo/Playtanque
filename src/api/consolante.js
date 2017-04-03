/**
 * Mocking client-server processing
 */
const _teams = [
  [2]
]

export default {
  getTeams (cb) {
    setTimeout(() => cb(_teams), 100)
  },

  win (cb) {
    setTimeout(() => cb(_teams), 100)
  },

  lose (teams, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
