import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFile,
  faTrashAlt,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons"

import getFilePath from "../../../utils/getFilePath"
import { database, storage } from "../../../firebase"
import { useAuth } from "../../../contexts/AuthContext"

export default function File({ file, currentFolder }) {
  const { currentUser } = useAuth()
  const [toDelete, setToDelete] = useState(false)

  function handleDelete() {
    setToDelete(false)

    database.files
      .doc(file.id)
      .delete()
      .then(() => {
        const path = getFilePath(currentFolder, file, currentUser)
        storage.ref(path).delete()
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <>
      {toDelete && (
        <>
          <Button
            variant="danger"
            className="w-50"
            onClick={() => setToDelete(false)}
            style={{ borderRadius: "0" }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <Button
            variant="success"
            className="w-50"
            onClick={handleDelete}
            style={{ borderRadius: "0" }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </>
      )}
      {!toDelete && (
        <>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setToDelete(true)}
            style={{
              position: "absolute",
              height: "38px",
              borderRight: "none"
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
          <a
            href={file.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-secondary text-truncate w-100"
          >
            <FontAwesomeIcon
              icon={faFile}
              style={{ marginLeft: "25", marginRight: "10" }}
            />
            {file.name}
          </a>
        </>
      )}
    </>
  )
}
