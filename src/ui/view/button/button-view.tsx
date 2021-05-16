import * as React from "react"
import IconFactory from "../../factory/icon"

import "./button-view.css"

export interface ButtonViewProps<Tag> {
    className?: string
    label: string
    /**
     * If defined, an icon is added (default to the left).
     * The icon's name is used in `icon-factory`.
     */
    icon?: string
    /** Flat buttons do not have any background. */
    flat?: boolean
    /** Default `false`. If `true`, use accent (secondary) color. */
    accent?: boolean
    /** Default `false`. If `true`, spread to the whole width. */
    wide?: boolean
    enabled?: boolean
    /** Default `false`. If `true`, the color is lighter.  */
    highlight?: boolean
    tag?: Tag
    onClick?(tag?: Tag): void
}

/**
 * @param props.label Text to display.
 * @param props.enabled Default `true`.
 * @param props.accent If `true` this is an accented button (with secondary color).
 * @param props.tag Any data you set as a tag will be triggered in `onClick(tag)` function.
 */
export default function ButtonView<Tag>(props: ButtonViewProps<Tag>) {
    const { label, icon, tag, onClick } = props
    const handleClick = () => {
        if (typeof onClick !== "function") return

        onClick(tag)
    }

    return (
        <button className={getClassNames(props)} onClick={handleClick}>
            {icon && IconFactory.make(icon)}
            <div className="label">{label}</div>
        </button>
    )
}

function getClassNames<Tag>(props: ButtonViewProps<Tag>): string {
    const { className, enabled, accent, highlight, wide, flat, icon } = props
    const classNames = ["custom", "ui-view-ButtonView"]
    if (typeof className === "string") {
        classNames.push(className)
    }
    if (enabled === false) classNames.push("disabled")
    if (highlight === true) classNames.push("highlighted")
    if (accent === true) classNames.push("accent")
    if (wide === true) classNames.push("wide")
    if (flat === true) classNames.push("flat")
    if (icon) classNames.push("with-icon")
    return classNames.join(" ")
}
