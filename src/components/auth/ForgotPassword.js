import React, { useRef, useState } from "react"
import { Card, Button, Form, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import CenteredContainer from "./CenteredContainer"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const email = emailRef.current.value

    try {
      setError("")
      setMessage("")
      setLoading(true)
      await resetPassword(email)
      setMessage("A password reset email was sent to your inbox.")
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Forgot password?</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="text-muted mb-3">
            Enter the email associated with your account and we'll send you an
            email with instructions to reset your password
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control
                placeholder="Email"
                size="lg"
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Reset
            </Button>
          </Form>
          <Link to="/login" className="btn btn-secondary w-100 mt-3">
            Login
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-decoration-none"
          style={{ color: "#0d4afc", fontWeight: "bold" }}
        >
          Sign Up
        </Link>
      </div>
    </CenteredContainer>
  )
}
