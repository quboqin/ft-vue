/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth } from 'aws-amplify'
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'

async function getUser(): Promise<any> {
  try {
    const user: any = await Auth.currentAuthenticatedUser()
    if (user && user.signInUserSession) {
      return user
    }
    return null
  } catch (error) {
    return null
  }
}

async function getCurrentSession(): Promise<CognitoUserSession | null> {
  try {
    return await Auth.currentSession()
  } catch (error) {
    return null
  }
}

async function signUp(
  phoneOrEmail: string,
  password: string,
  isPhone: boolean,
  firstName?: string,
  lastName?: string,
): Promise<any> {
  try {
    await Auth.signUp({
      username: phoneOrEmail,
      password,
      attributes: isPhone
        ? {
            phone_number: phoneOrEmail,
            email: 'quboqin0710@gmail.com',
          }
        : {
            email: phoneOrEmail,
          },
    })

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return await signIn(phoneOrEmail, isPhone, firstName, lastName)
  } catch (error) {
    console.log(error)
  }
  return null
}

async function signIn(
  phoneOrEmail: string,
  isPhone: boolean,
  firstName?: string,
  lastName?: string,
): Promise<any> {
  console.log(`Signin with ${phoneOrEmail}`)
  try {
    const user = await Auth.signIn(phoneOrEmail)
    if (user) return user
    return null
  } catch (error: any) {
    if (error.code === 'UserNotConfirmedException') {
      // The error happens if the user didn't finish the confirmation step when signing up
      // In this case you need to resend the code and confirm the user
      // About how to resend the code and confirm the user, please check the signUp part
    } else if (error.code === 'PasswordResetRequiredException') {
      // The error happens when the password is reset in the Cognito console
      // In this case you need to call forgotPassword to reset the password
      // Please check the Forgot Password part.
    } else if (error.code === 'NotAuthorizedException') {
      // The error happens when the incorrect password is provided
    } else if (error.code === 'UserNotFoundException') {
      // The error happens when the supplied username/email does not exist in the Cognito user pool
      return await signUp(
        phoneOrEmail,
        Date.now().toString(),
        isPhone,
        firstName,
        lastName,
      )
    } else {
      console.log(error)
    }

    return null
  }
}

async function sendCustomChallengeAnswer(
  cognitoUser: CognitoUser,
  OTP: string,
): Promise<any> {
  try {
    const data = await Auth.sendCustomChallengeAnswer(cognitoUser, OTP)
    const user = await getUser()
    if (user) {
      return data
    }
    throw new Error('Apparently the user did not enter the right code')
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function signOut(): Promise<any> {
  try {
    const data = await Auth.signOut()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export {
  getUser,
  getCurrentSession,
  signIn,
  signUp,
  sendCustomChallengeAnswer,
  signOut,
}
