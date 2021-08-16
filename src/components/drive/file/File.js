import React from "react"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faTrashAlt } from "@fortawesome/free-solid-svg-icons"

import getFilePath from "../../../utils/getFilePath"
import { database, storage } from "../../../firebase"
import { useAuth } from "../../../contexts/AuthContext"

export default function File({ file, currentFolder }) {
  const { currentUser } = useAuth()

  function handleDelete() {
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
      <Button
        variant="outline-secondary"
        size="sm"
        style={{ position: "absolute", height: "38px", borderRight: "none" }}
        onClick={handleDelete}
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
  )
}
