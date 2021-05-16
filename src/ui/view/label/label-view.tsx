import * as React from "react"

import './label-view.css'

export interface LabelViewProps {
    className?: string
    target?: string
    value?: string
}

/**
 * @param props.value Text to display. If undefined, view is null.
 * @param props.target ID of the element to link this label to. 
 */
export default function(props: LabelViewProps) {
    const { value, target }=props
    if (typeof value === 'undefined') return null

    return <label htmlFor={target} className={getClassNames(props)}>{
        value
    }</label>
}


function getClassNames(props: LabelViewProps): string {
    const classNames = ['custom', 'ui-view-LabelView']
    if (typeof props.className === 'string') {
        classNames.push(props.className)
    }

    return classNames.join(' ')
}
