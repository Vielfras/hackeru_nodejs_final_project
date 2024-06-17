import { jwtDecode } from 'jwt-decode'
import { IUserSigninJwtPayload, IUserSignup } from '../interfaces/UserInterfaces'
import { IUserDetails } from '../interfaces/UserInterfaces'
import { apiBase } from '../config'

/* ----------------------------------------------------------------------------------------------------- */

// handle the actual sign-in mechanism

export const doSignIn = async (email:string,password:string): Promise<{error:string|null,result?:IUserDetails|undefined}> => {
  try {
    // send the email & password to the server,
    // if all goes well we should receive a token (string)
    const response = await fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email,password})
    })

    // let's extract the response body
    const body = await response.json();

    // the server returned status code not in the 200-299 range, so quit and return an error message
    if (!response.ok) return { error: body.message }

    // no error, let's save the token in local storage
    await saveToken(body.token)

    // let's try to fetch user details from the server
    let { error,result } = await fetchUserDetails();
    // there's an error, return it
    if (error) return { error }
    // no error- return result
    return { error:null, result }
  } catch(err) {
    // there's an error, return it
    const errMessage = (err as Error).message
    return { error: errMessage }
  }
}

/* ----------------------------------------------------------------------------------------------------- */

// handle the actual sign-up mechanism

export const doSignUp = async (userData:IUserSignup): Promise<{error:string|undefined}> => {
  try {
    // send the email & password to the server,
    // if all goes well we should receive a token (string)
    const response = await fetch(`${apiBase}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })

    // let's get the response text (error message -or- token)
    const body = await response.json()

    // the server returned status code not in the 200-299 range, so quit and return an error message
    if (!response.ok) return { error: body.message }

    // if no errors
    return { error:undefined }

  } catch(err) {
    // there's an error, return it
    const errMessage = (err as Error).message
    return { error: errMessage }
  }
}

/* ----------------------------------------------------------------------------------------------------- */

// save the token to local storage

const saveToken = async (token:string):Promise<void> => {
  localStorage.setItem('userToken',token)
}

/* ----------------------------------------------------------------------------------------------------- */

// remove the token to local storage

export const removeToken = async ():Promise<void> => {
  localStorage.removeItem('userToken')
}

/* ----------------------------------------------------------------------------------------------------- */

// get the token from local storage

export const getToken = async (): Promise<string|null> => {
  const token = localStorage.getItem('userToken')
  if (token) { 
    return token
  } else { 
    return null
  }
}

/* ----------------------------------------------------------------------------------------------------- */

// decode the token string

const decodeToken = async (token:string):Promise<IUserSigninJwtPayload> => {
  return jwtDecode<IUserSigninJwtPayload>(token)
}

/* ----------------------------------------------------------------------------------------------------- */

// fetch the extended user details from the server

export const fetchUserDetails = async (): Promise<{error:string|null,result?:IUserDetails|undefined}> => {
  // get the token from ls
  const token = await getToken()
  // if no token (null) - stop and return an error message
  if (!token) return { error: `Can't read token from local storage` }
  try {
    // try to fetch the user details from the server,
    // we have to send the token with the request (see header 'x-auth-token')
    const response = await fetch(`${apiBase}/auth/profile`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    })
    // return an error if server returned status code not in 200-299 range
    if (!response.ok) return { error: `Error fetching the user's details (${response.statusText})` }
    // all good, let's extract the data from the response
    const userDetails:IUserDetails = (await response.json()).data;
    // and return it
    return { error:null, result: userDetails }
  } catch(err) {
    // return an error if fetch failed
    const errMessage = (err as Error).message
    return { error: `Error fetching the user's details (${errMessage})` }
  }
}

/* ----------------------------------------------------------------------------------------------------- */