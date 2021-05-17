import * as React from "react"
import ListView from "../list"
import ServiceInterface, { IFile } from "../../contract/service"
import Modal from "../../ui/modal"
import Input from "../../ui/view/input/text"

import "./app-view.css"

export interface AppViewProps {
    className?: string
    service: ServiceInterface
}

export default function AppView(props: AppViewProps) {
    const { service } = props
    return (
        <div className={getClassNames(props)}>
            <ListView
                service={service}
                onEditFile={handleEditFile}
                onAddFile={() => handleAddFile(service)}
            />
        </div>
    )
}

function getClassNames(props: AppViewProps): string {
    const classNames = ["custom", "view-AppView"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }

    return classNames.join(" ")
}

async function handleAddFile(service: ServiceInterface): Promise<boolean> {
    let fileTitle = ""
    const confirm = await Modal.confirm({
        content: (
            <Input
                value=""
                label="Nom du dossier à ajouter à votre bibliothèque"
                onChange={v => (fileTitle = v)}
            />
        )
    })
    if (!confirm) return false

    await service.createFile(fileTitle)
    return true
}

function handleEditFile(file: IFile) {
    window.location.search = `?${file.id}`
}
