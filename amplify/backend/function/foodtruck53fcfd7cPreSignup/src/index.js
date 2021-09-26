exports.handler = async (event) => {
  event.response.autoConfirmUser = true
  if (event.request.userAttributes.phone_number) {
    event.response.autoVerifyPhone = true
  }
  if (event.request.userAttributes.email) {
    event.response.autoVerifyEmail = true
  }

  return event
}
