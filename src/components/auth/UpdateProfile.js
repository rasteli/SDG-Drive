import React, { useRef, useState } from "react"
import { Card, Button, Form, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import CenteredContainer from "./CenteredContainer"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const confirmation = passwordConfirmRef.current.value

    if (password !== confirmation) return setError("Passwords do not match")

    setError("")
    setLoading(true)

    const promises = []

    if (email !== currentUser.email) promises.push(updateEmail(email))
    if (password) promises.push(updatePassword(password))

    Promise.all(promises)
      .then(() => {
        history.push("/profile")
      })
      .catch(error => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep password"
              />
            </Form.Group>
            <Form.Group id="password-confirm" className="mt-2">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep password"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Update
            </Button>
          </Form>
          <Link to="/profile" className="btn btn-secondary w-100 mt-3">
            Cancel
          </Link>
        </Card.Body>
      </Card>
    </CenteredContainer>
  )
}
