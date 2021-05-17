import * as React from "react"
import { IFile } from "../../contract/service"
import Button from "../../ui/view/button"
import DateFormat from "../../date-format"
import IconFactory from "../../ui/factory/icon"
import Modal from "../../ui/modal"
import QRCode from "qrcode-generator"

import "./file-view.css"

export interface FileViewProps {
    className?: string
    nickname: string
    file: IFile
    /**
     * @param borrower If not defined, we are putting back the file in the shelves.
     */
    onChange(file: IFile): void
    onDelete(fileId: number): void
}

export default function FileView(props: FileViewProps) {
    const { nickname, file, onChange, onDelete } = props
    const handleBorrow = () => {
        file.borrower = nickname
        file.date = Date.now()
        onChange({ ...file })
    }
    const handleRelease = () => {
        delete file.borrower
        file.date = Date.now()
        onChange({ ...file })
    }
    const handleMenu = async () => {
        const { origin, pathname } = window.location
        const url = `${origin}${pathname}?${file.id}`
        const qrcode = QRCode(0, "L")
        qrcode.addData(url)
        qrcode.make()
        await Modal.info(
            <div>
                <Button
                    wide={true}
                    accent={true}
                    label="Supprimer ce dossier"
                    onClick={async () => {
                        const confirm = await Modal.confirm({
                            title: "Supprimer ce dossier",
                            content: (
                                <div>
                                    Êtes-vous sûr de vouloir supprimer le
                                    dossier <b>{file.title}</b> ?
                                </div>
                            ),
                            accent: true,
                            labelCancel: "Non",
                            labelOK: "Supprimer"
                        })
                        if (!confirm) return
                        onDelete(file.id)
                    }}
                />
                <div style={{ textAlign: "center" }}>
                    <p>
                        <b>{file.title}</b>
                    </p>
                    <img
                        style={{ width: "70vmin" }}
                        alt={`QRCOde pour ${file.title}`}
                        src={qrcode.createDataURL()}
                    />
                </div>
                <Button
                    wide={true}
                    label="Rechercher / Ajouter un dossier"
                    onClick={() => (window.location.search = "")}
                />
            </div>
        )
    }
    return (
        <div className={getClassNames(props)}>
            <header>
                <div>{nickname}</div>
                <button onClick={handleMenu}>{IconFactory.make("menu")}</button>
            </header>
            <main>
                <div>
                    <div className="file">{file.title}</div>
                    {file.borrower && (
                        <div className="borrow">
                            Ce dossier a été emprunté par <b>{file.borrower}</b>{" "}
                            le {DateFormat.short(new Date(file.date))}.
                        </div>
                    )}
                </div>
                {!file.borrower && (
                    <div className="shelves">
                        Ce dossier est en rayon depuis le{" "}
                        {DateFormat.short(new Date(file.date))}.
                    </div>
                )}
                <Button
                    className="borrow"
                    flat={!!file.borrower}
                    wide={true}
                    label="Emprunter ce dossier"
                    onClick={handleBorrow}
                />
                <Button
                    className="release"
                    flat={!file.borrower}
                    wide={true}
                    label="Remettre ce dossier en rayons"
                    onClick={handleRelease}
                />
            </main>
        </div>
    )
}

function getClassNames(props: FileViewProps): string {
    const classNames = ["custom", "view-FileView"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }
    if (props.file.borrower) classNames.push("release")
    else classNames.push("borrow")

    return classNames.join(" ")
}
