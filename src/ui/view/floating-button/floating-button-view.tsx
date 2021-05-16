/**
 * @see https://material.io/components/buttons-floating-action-button#usage
 */
import * as React from "react"
import IconFactory from "../../factory/icon"

import "./floating-button-view.css"

export interface FloatingButtonViewProps<Tag> {
    className?: string
    icon: string
    small?: boolean
    accent?: boolean
    enabled?: boolean
    highlight?: boolean
    tag?: Tag
    onClick?(tag?: Tag): void
}

export default function FloatingButtonView<Tag>(
    props: FloatingButtonViewProps<Tag>
) {
    const handleClick = () => {
        const { onClick, tag } = props
        if (!onClick) return

        onClick(tag)
    }
    return (
        <button className={getClassNames<Tag>(props)} onClick={handleClick}>
            {IconFactory.make(props.icon)}
        </button>
    )
}

function getClassNames<Tag>(props: FloatingButtonViewProps<Tag>): string {
    const { className, small, enabled, accent, highlight } = props
    const classNames = ["custom", "ui-view-FloatingButtonView"]
    if (typeof className === "string") {
        classNames.push(className)
    }
    if (small === true) classNames.push("small")
    if (enabled === false) classNames.push("disabled")
    if (highlight === true) classNames.push("highlighted")
    if (accent === true) classNames.push("accent")
    return classNames.join(" ")
}
