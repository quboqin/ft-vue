const AWS = require('aws-sdk')

const ses = new AWS.SES()

async function sendEmail(emailAddress, secretLoginCode) {
  const params = {
    Destination: { ToAddresses: [emailAddress] },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<html><body><p>This is your secret login code:</p>
                         <h3>${secretLoginCode}</h3></body></html>`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `Your verification code is ${secretLoginCode}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Your verification code',
      },
    },
    Source: 'quboqin0710@gmail.com',
  }
  await ses.sendEmail(params).promise()
}

function sendSMS(phone, code) {
  const params = {
    Message: `Your verification code is ${code}` /* required */,
    PhoneNumber: phone,
  }

  return new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise()
}

exports.handler = async (event) => {
  console.log('CUSTOM_CHALLENGE_LAMBDA', event.request)

  let secretLoginCode
  if (!event.request.session || !event.request.session.length) {
    // Generate a new secret login code and send it to the user
    secretLoginCode = Date.now().toString().slice(-6)
    try {
      if (event.request.userAttributes.phone_number) {
        console.log(
          `send a challenge ${secretLoginCode} to ${event.request.userAttributes.phone_number}`,
        )
        await sendSMS(
          event.request.userAttributes.phone_number,
          secretLoginCode,
        )
      }
      if (event.request.userAttributes.email) {
        console.log(
          `send a challenge ${secretLoginCode} to ${event.request.userAttributes.email}`,
        )
        await sendEmail(event.request.userAttributes.email, secretLoginCode)
      }
    } catch (error) {
      // Handle SMS Failure
      console.log(error)
    }
  } else {
    // re-use code generated in previous challenge
    const previousChallenge = event.request.session.slice(-1)[0]
    secretLoginCode = previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1]
  }

  if (event.request.userAttributes.email) {
    event.response.publicChallengeParameters = {
      email: event.request.userAttributes.email,
    }
  }

  console.log(event.request.userAttributes)

  // Add the secret login code to the private challenge parameters
  // so it can be verified by the "Verify Auth Challenge Response" trigger
  event.response.privateChallengeParameters = { secretLoginCode }

  // Add the secret login code to the session so it is available
  // in a next invocation of the "Create Auth Challenge" trigger
  event.response.challengeMetadata = `CODE-${secretLoginCode}`

  return event
}
