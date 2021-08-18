import React, { useState } from "react"
import { Card, Button, Alert, Form, Row, Col } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEye,
  faEyeSlash,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "../../contexts/AuthContext"
import CenteredContainer from "./CenteredContainer"

export default function Profile() {
  const [error, setError] = useState("")
  const [inputType, setInputType] = useState("password")

  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const isInputPassword = inputType === "password"

  async function handleLogout() {
    try {
      setError("")
      await logout()
      history.push("/login")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <CenteredContainer style={{ position: "relative" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Your email</strong>
          <Row>
            <Col style={{ position: "relative" }}>
              <Form.Control
                disabled
                defaultValue={currentUser.email}
                type={inputType}
                className="mt-2"
              />
              <FontAwesomeIcon
                onClick={() =>
                  setInputType(isInputPassword ? "email" : "password")
                }
                icon={isInputPassword ? faEye : faEyeSlash}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "20px",
                  top: "20px"
                }}
              />
            </Col>
          </Row>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <Link to="/" className="btn btn-secondary w-100 mt-3">
            Back
          </Link>
          <Button
            variant="outline-danger"
            onClick={handleLogout}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <FontAwesomeIcon size="lg" icon={faSignOutAlt} />
          </Button>
        </Card.Body>
      </Card>
    </CenteredContainer>
  )
}
