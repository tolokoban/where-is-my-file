import * as React from "react"
import { IFile } from "../../contract/service"
import Button from "../../ui/view/button"
import DateFormat from "../../date-format"
import IconFactory from '../../ui/factory/icon'

import "./file-view.css"

export interface FileViewProps {
    className?: string
    nickname: string
    file: IFile
    /**
     * @param borrower If not defined, we are putting back the file in the shelves.
     */
    onChange(file: IFile): void
}

export default function FileView(props: FileViewProps) {
    const { nickname, file, onChange } = props
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
    const { origin, pathname } = window.location
    const url = `${origin}${pathname}`
    return (
        <div className={getClassNames(props)}>
            <header>
                <div>{nickname}</div>
                <a href={url}>{IconFactory.make('menu')}</a>
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
