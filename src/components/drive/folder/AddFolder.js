import React, { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { database } from "../../../firebase"
import { useAuth } from "../../../contexts/AuthContext"
import { ROOT_FOLDER } from "../../../hooks/useFolder"

export default function AddFolder({ currentFolder }) {
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)
  const { currentUser } = useAuth()

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (currentFolder == null) return

    const path = [...currentFolder.path]

    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id })
    }

    database.folders.add({
      name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path,
      createdAt: database.getCurrentTimestamp()
    })

    setName("")
    closeModal()
  }

  return (
    <>
      <Button
        onClick={openModal}
        variant="outline-info"
        size="sm"
        style={{ transform: "scale(1.5)" }}
      >
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="info" type="submit">
              Add folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
