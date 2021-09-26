exports.handler = async (event, context, callback) => {
  console.log(event.request)

  // If user is not registered
  if (event.request.userNotFound) {
    event.response.issueToken = false
    event.response.failAuthentication = true
    console.log('User does not exist')
    throw new Error('User does not exist')
  }

  if (
    event.request.session.length >= 3 &&
    event.request.session.slice(-1)[0].challengeResult === false
  ) {
    // wrong OTP even After 3 sessions?
    event.response.issueToken = false
    event.response.failAuthentication = true
    console.log('Invalid OTP')
    throw new Error('Invalid OTP')
  } else if (
    event.request.session.length > 0 &&
    event.request.session.slice(-1)[0].challengeResult === true
  ) {
    // Correct OTP!
    event.response.issueTokens = true
    event.response.failAuthentication = false
    console.log('Correct OTP!')
  } else {
    // not yet received correct OTP
    event.response.issueTokens = false
    event.response.failAuthentication = false
    event.response.challengeName = 'CUSTOM_CHALLENGE'
    console.log('Not yet received correct OTP')
  }

  return event
}
