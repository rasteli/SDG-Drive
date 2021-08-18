import React, { useRef, useState } from "react"
import { Card, Button, Form, Alert, InputGroup } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "../../contexts/AuthContext"
import CenteredContainer from "./CenteredContainer"

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value

    try {
      setError("")
      setLoading(true)
      await login(email, password)
      history.push("/")
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-5">Login to your SDG Drive</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <InputGroup id="email">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faEnvelope} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Email"
                size="lg"
                type="email"
                ref={emailRef}
                required
              />
            </InputGroup>
            <InputGroup id="password" className="mt-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faKey} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Password"
                size="lg"
                type="password"
                ref={passwordRef}
                required
              />
            </InputGroup>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Login
            </Button>
            <Link
              to="/forgot-password"
              className="btn btn-secondary w-100 mt-3"
            >
              Forgot password?
            </Link>
          </Form>
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
