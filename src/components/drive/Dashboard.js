import React from "react"
import { Container } from "react-bootstrap"
import { useParams, useLocation } from "react-router"

import Navbar from "./Navbar"
import Folder from "./folder/Folder"
import File from "./file/File"
import AddFolder from "./folder/AddFolder"
import AddFile from "./file/AddFile"
import { useFolder } from "../../hooks/useFolder"
import FolderBreadCrumbs from "./folder/FolderBreadCrumbs"

export default function Dashboard() {
  const { folderId } = useParams() // gets url ids
  const { state = {} } = useLocation()
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)

  return (
    <>
      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadCrumbs currentFolder={folder} />
          <AddFile currentFolder={folder} />
          <AddFolder currentFolder={folder} />
        </div>
        {console.log(childFolders.length)}
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={childFile} currentFolder={folder} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
