import React, { useRef, useState } from "react"
import { Card, Button, Form, Alert, InputGroup } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons"
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
            <InputGroup id="email">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faEnvelope} />
              </InputGroup.Text>
              <Form.Control
                type="email"
                size="lg"
                ref={emailRef}
                defaultValue={currentUser.email}
                required
              />
            </InputGroup>
            <InputGroup id="password" className="mt-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faKey} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep password"
                size="lg"
                ref={passwordRef}
              />
            </InputGroup>
            <InputGroup id="password-confirm" className="mt-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faKey} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep password"
                size="lg"
                ref={passwordConfirmRef}
              />
            </InputGroup>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
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
