import * as React from "react"
import IconFactory from '../../factory/icon'
import './icon-view.css'


export interface IconViewProps {
    className?: string
    name: string
    onClick?(): void
}

export default function IconView(props: IconViewProps) {
    const handleClick = ()=> {
        if (!props.onClick) return

        props.onClick()
    }
    return <div className={getClassNames(props)} tabIndex={0} onClick={handleClick}>
        {IconFactory.make(props.name)}
    </div>
}


function getClassNames(props: IconViewProps): string {
    const classNames = ['custom', 'ui-view-IconView']
    if (typeof props.className === 'string') {
        classNames.push(props.className)
    }
    if (props.onClick) classNames.push('clickable')
    return classNames.join(' ')
}
