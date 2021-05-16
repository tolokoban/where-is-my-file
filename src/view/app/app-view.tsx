import * as React from "react"
import ListView from "../list"
import ServiceInterface, { IFile } from "../../contract/service"
import Modal from "../../ui/modal"
import Button from "../../ui/view/button"
import Input from "../../ui/view/input/text"
import QRCode from "qrcode-generator"

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

async function handleEditFile(file: IFile): Promise<IFile | null> {
    const confirm = await Modal.confirm({
        title: file.title,
        content: (
            <div>
                <Button
                    wide={true}
                    label={
                        file.borrower
                            ? "Remettre ce dossier en rayons."
                            : "Emprunter ce dossier."
                    }
                    flat={true}
                    onClick={() => (window.location.search = `?${file.id}`)}
                />
                <br />
                <Button
                    wide={true}
                    label="Télécharger le QRCode"
                    onClick={() => handleQRCode(file)}
                />
                <hr />
                Voulez-vous supprimer le dossier
                <br />
                <b>{file.title}</b>?
            </div>
        ),
        accent: true,
        labelOK: "Supprimer ce dossier"
    })
    if (confirm) return null
    return file
}

async function handleQRCode(file: IFile) {
    const { origin, pathname } = window.location
    const url = `${origin}${pathname}?${file.id}`
    const qrcode = QRCode(0, "L")
    qrcode.addData(url)
    qrcode.make()
    await Modal.info(
        <div style={{ textAlign: "center" }}>
            <p>
                <b>{file.title}</b>
            </p>
            <img
                style={{ width: "70vmin" }}
                alt={`QRCOde pour ${file.title}`}
                src={qrcode.createDataURL()}
            />
        </div>,
        {
            padding: "1rem"
        }
    )
}
