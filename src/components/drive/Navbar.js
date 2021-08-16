import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="sm" className="p-3">
      <Navbar.Brand as={Link} to="/">
        SDG Drive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
