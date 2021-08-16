import { ROOT_FOLDER } from "../hooks/useFolder"

export default function getFilePath(currentFolder, file, currentUser) {
  const pathArray = []

  currentFolder.path.forEach(folder => {
    pathArray.push(folder.name)
  })

  const formattedPath = pathArray.join("/")

  const filePath =
    currentFolder === ROOT_FOLDER
      ? `${formattedPath}/${file.name}`
      : `${formattedPath}/${currentFolder.name}/${file.name}`

  const path = `/files/${currentUser.uid}/${filePath}`

  return path
}
