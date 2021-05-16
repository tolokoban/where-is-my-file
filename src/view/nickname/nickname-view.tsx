import * as React from "react"
import TextInput from '../../ui/view/input/text'

import './nickname-view.css'


export interface NicknameViewProps {
    className?: string
    nickname?: string
    onChange(nickname: string): void
}

export default function NicknameView(props: NicknameViewProps) {
    const {onChange}=props
    const [nickname, setNickname]=React.useState(props.nickname ?? '')
    const handleChange=(value: string)=> {
        setNickname(value)
        onChange(value)
    }
    return <div className={getClassNames(props)}>
        <TextInput
            wide={true}
            label="Veuillez choisir un pseudonyme"
            value={nickname}
            onChange={handleChange}
        />
        <p>Ce pseudonyme sera associé aux dossiers que vous emprunterez.</p>
    </div>
}


function getClassNames(props: NicknameViewProps): string {
    const classNames = ['custom', 'view-NicknameView']
    if (typeof props.className === 'string') {
        classNames.push(props.className)
    }

    return classNames.join(' ')
}
