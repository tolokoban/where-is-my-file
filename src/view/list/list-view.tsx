import * as React from "react"
import TextInput from "../../ui/view/input/text"
import FloatingButton from "../../ui/view/floating-button"
import ServiceInterface, { IFile } from "../../contract/service"
import FileButton from "../file-button"

import "./list-view.css"

export interface ListViewProps {
    className?: string
    service: ServiceInterface
    onEditFile(file: IFile): Promise<IFile | null>
    onAddFile(): Promise<boolean>
}

/**
 * List all files
 */
export default function ListView(props: ListViewProps) {
    const { service } = props
    const [filter, setFilter] = React.useState("")
    const [files, setFiles] = React.useState<IFile[]>([])
    const cleanFilter = filter.trim().toLowerCase()
    const filteredFiles = files.filter(
        file =>
            cleanFilter.length === 0 ||
            file.title.toLowerCase().includes(cleanFilter)
    )
    React.useEffect(() => {
        const late = async () => {
            const files = await service.listAllFiles()
            setFiles(files)
        }
        late()
    }, [service])
    const handleFileClick = (file: IFile) => {
        const late = async () => {
            const editedFile = await props.onEditFile(file)
            if (!editedFile) {
                setFiles(files.filter(f => f.id !== file.id))
                await service.deleteFile(file.id)
            } else {
                setFiles([...files])
            }
        }
        late()
    }
    const handleAddFile = async () => {
        const confirm = await props.onAddFile()
        if (!confirm) return

        setFiles(await service.listAllFiles())
    }
    return (
        <div className={getClassNames(props)}>
            <header>
                <TextInput
                    wide={true}
                    label="Rechercher un dossier par nom"
                    value={filter}
                    onChange={setFilter}
                />
            </header>
            <main>
                {filteredFiles.map(file => (
                    <FileButton
                        key={file.id}
                        file={file}
                        onClick={handleFileClick}
                    />
                ))}
                <p>
                    Appuyez sur le bouton ci-dessous pour ajouter un nouveau
                    dossier à votre bibliothèque.
                </p>
                <div className="space" />
            </main>
            <footer>
                <FloatingButton
                    icon="add"
                    accent={true}
                    onClick={handleAddFile}
                />
            </footer>
        </div>
    )
}

function getClassNames(props: ListViewProps): string {
    const classNames = ["custom", "view-ListView"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }

    return classNames.join(" ")
}
