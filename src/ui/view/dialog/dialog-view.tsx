import * as React from "react"
import Button from "../button"

import "./dialog-view.css"

export interface DialogViewProps {
    className?: string
    /** If a `title` is defined, a dark primary header will be displayed. */
    title?: string
    /** If `false`, __OK__ button will be disabled. */
    valid?: boolean
    children: JSX.Element | JSX.Element[] | string
    /**
     * Passed to the __OK__ button. Usually, accented buttons
     * will change the application functional state.
     */
    accent?: boolean
    /** Triggered when __OK__ button has been clicked */
    onOK?(): void
    /** Triggered when __Cancel__ button has been clicked */
    onCancel?(): void
    /** If `true` don't display any __Cancel__ button. */
    hideCancel?: boolean
    /** Rename the __OK__ button. */
    labelOK?: string
    /** Rename the __Cancel__ button. */
    labelCancel?: string
}

export default function DialogView(props: DialogViewProps) {
    const {
        accent,
        title,
        valid,
        children,
        hideCancel,
        labelOK,
        labelCancel,
        onOK,
        onCancel
    } = props

    return (
        <div className={getClassNames(props)}>
            {title && <header>{title}</header>}
            <div>{children}</div>
            <footer>
                {!(hideCancel ?? false) && (
                    <Button
                        label={labelCancel ?? "Cancel"}
                        onClick={onCancel}
                    />
                )}
                <Button
                    accent={accent}
                    enabled={valid ?? true}
                    label={labelOK ?? "OK"}
                    onClick={onOK}
                />
            </footer>
        </div>
    )
}

function getClassNames(props: DialogViewProps): string {
    const classNames = ["custom", "ui-view-DialogView"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }

    return classNames.join(" ")
}
