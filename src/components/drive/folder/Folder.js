import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"

export default function Folder({ folder }) {
  return (
    <Link
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder }
      }}
      className="btn btn-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFolder} style={{ marginRight: "10" }} />
      {folder.name}
    </Link>
  )
}
