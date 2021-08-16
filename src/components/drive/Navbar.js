import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import logo from "../../sdg.svg"

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="sm" className="p-3">
      <Navbar.Brand
        as={Link}
        to="/"
        style={{
          marginRight: "100px",
          marginBottom: "-20px",
          marginTop: "-15px"
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            transform: "scale(.7)",
            marginLeft: "-15px",
            marginTop: "-10px"
          }}
        />
        SDG Drive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/profile" style={{ marginTop: "1.2px" }}>
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
