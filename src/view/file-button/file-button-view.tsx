import * as React from "react"
import { IFile } from "../../contract/service"
import FormatDate from "../../date-format"

import "./file-button-view.css"

export interface FileButtonViewProps {
    className?: string
    file: IFile
    onClick(file: IFile): void
}

export default function FileButtonView(props: FileButtonViewProps) {
    const { file, onClick } = props
    return (
        <button
            className={getClassNames(props)}
            title={`#${file.id}`}
            onClick={() => onClick(file)}
        >
            <div>{file.title}</div>
            {file.borrower && (
                <div>
                    Emprunté par <b>{file.borrower}</b> le{" "}
                    {FormatDate.short(new Date(file.date))}
                </div>
            )}
            {!file.borrower && (
                <div>En rayon le {FormatDate.short(new Date(file.date))}</div>
            )}
        </button>
    )
}

function getClassNames(props: FileButtonViewProps): string {
    const classNames = ["custom", "view-FileButtonView"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }
    if (props.file.borrower) classNames.push("borrowed")

    return classNames.join(" ")
}
