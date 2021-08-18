import emailjs from "emailjs-com"
import React, { useState } from "react"
import { Form, Card, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"

import CenteredContainer from "./CenteredContainer"
import { useAuth } from "../../contexts/AuthContext"

export default function Contact() {
  const { currentUser } = useAuth()
  const [issue, setIssue] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    const user_email = currentUser.email

    if (!issue) return setError("Please, fill out all fields")

    setLoading(true)

    emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID)

    const templateParams = {
      message: issue,
      user_email
    }

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
      )
      .then(response => {
        setIssue("")
        setLoading(false)
        setMessage(
          "Thank you for your contact. You'll be contacted back shortly."
        )
      })
      .catch(error => {
        setLoading(false)
        setError(error.message)
      })
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Contact Us</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <strong>Email</strong>
              <Form.Control
                type="email"
                defaultValue={currentUser.email}
                disabled={true}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <strong>Describe your issue</strong>
              <Form.Control
                as="textarea"
                rows={8}
                value={issue}
                onChange={e => setIssue(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="w-100 mt-2"
              disabled={loading}
            >
              Send Issue
            </Button>
          </Form>
          <Button as={Link} to="/" variant="secondary" className="w-100 mt-2">
            Cancel
          </Button>
        </Card.Body>
      </Card>
    </CenteredContainer>
  )
}
