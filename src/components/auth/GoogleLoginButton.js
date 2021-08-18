import React from "react"
import GoogleLogin from "react-google-login"
import api from "../../services/api"

export default function GoogleLoginButton({
  signup,
  login,
  history,
  setError
}) {
  async function loginWithGoogle(googleData) {
    const response = await api.post("/api/auth/google", {
      token: googleData.tokenId
    })

    const {
      user: { email, password },
      signedUp = false
    } = response.data

    try {
      if (!signedUp) await signup(email, password)
      else await login(email, password)
      history.push("/")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={loginWithGoogle}
      buttonText="Log in with google"
      className="w-100 mt-3"
    />
  )
}
