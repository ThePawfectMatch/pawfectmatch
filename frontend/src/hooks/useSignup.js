import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, picPath, firstName, lastName, phoneNumber, 
    zipcode, bio, accountType, livingArrangements, lifestyleTraits, petPreferences) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password, picPath, firstName, lastName, phoneNumber, 
        zipcode, bio, accountType, livingArrangements, lifestyleTraits, petPreferences })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      console.log(json.error)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)

      console.log("login successful")
    }
  }

  return { signup, isLoading, error }
}