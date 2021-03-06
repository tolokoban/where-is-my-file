import * as React from "react"
import TextInput from "../../ui/view/input/text"
import FloatingButton from "../../ui/view/floating-button"
import IconFactory from "../../ui/factory/icon"
import ServiceInterface, { IFile } from "../../contract/service"
import FileButton from "../file-button"

import "./list-view.css"
import Modal from "../../ui/modal"

export interface ListViewProps {
    className?: string
    service: ServiceInterface
    onEditFile(file: IFile): void
    onAddFile(): Promise<boolean>
}

/**
 * List all files
 */
export default function ListView(props: ListViewProps) {
    const { service, onEditFile } = props
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
    const handleAddFile = async () => {
        const confirm = await props.onAddFile()
        if (!confirm) return

        setFiles(await service.listAllFiles())
    }
    return (
        <div className={getClassNames(props)}>
            <header>
                <div className="nickname">
                    <div>{service.getNickname()}</div>
                    <button onClick={() => handleEditNickname(service)}>
                        {IconFactory.make("edit")}
                    </button>
                </div>
                <TextInput
                    wide={true}
                    label="Rechercher un dossier par nom"
                    value={filter}
                    onChange={setFilter}
                />
            </header>
            <main>
                <div className="files">
                    {filteredFiles.map(file => (
                        <FileButton
                            key={file.id}
                            file={file}
                            onClick={onEditFile}
                        />
                    ))}
                </div>
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

async function handleEditNickname(service: ServiceInterface) {
    let nickname = service.getNickname()
    const confirm = await Modal.confirm({
        title: "Éditer le pseudonyme",
        content: (
            <TextInput
                label="Pseudonyme"
                value={nickname}
                onChange={value => (nickname = value)}
            />
        ),
        labelCancel: "Annuler",
        labelOK: "Valider"
    })
    if (!confirm) return
    service.setNickname(nickname)
    window.location.reload()
}
