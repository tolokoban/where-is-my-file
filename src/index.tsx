import React from "react"
import ReactDOM from "react-dom"
import App from "./view/app"
import Theme from "./ui/theme"
import Service from "./service"
import Modal from "./ui/modal"
import Nickname from "./view/nickname"
import FileView from "./view/file"
import { IFile } from "./contract/service"

import "./index.css"

const service = new Service()

async function start() {
    Theme.apply({
        colors: {
            accent: {
                dark: "#EB6B0A",
                base: "#EB6B0A",
                light: "#EB6B0A"
            },
            primary: {
                dark: "#333",
                base: "#444",
                light: "#555"
            },
            black: "#333",
            white: "#eee",
            error: "#f30",
            input: "#eee",
            section: "#ccc",
            frame: "#bbb",
            screen: "#aaa"
        }
    })

    const nickname = await service.getNickname()
    if (!nickname) {
        service.setNickname(await askNickname())
        window.location.reload()
    }
    const root = document.getElementById("root")
    const fileId = parseInt(window.location.search.substr(1), 10)
    if (isNaN(fileId) || fileId < 1) {
        ReactDOM.render(<App service={service} />, root)
    } else {
        const file = await service.getInfo(fileId)
        if (!file) return
        ReactDOM.render(
            <FileView
                file={file}
                nickname={nickname ?? "---"}
                onChange={handleFileChange}
                onDelete={handleDeleteFile}
            />,
            root
        )
    }
    const splash = document.getElementById('splash')
    if (splash) splash.classList.add('vanish')
}

start()

async function handleDeleteFile(fileId: number) {
    await service.deleteFile(fileId)
    window.location.search = ''
}

async function askNickname() {
    let nickname = ""
    await Modal.info(<Nickname onChange={v => (nickname = v)} />, {
        padding: "1rem"
    })
    return nickname
}

async function handleFileChange(file: IFile) {
    if (file.borrower) {
        await Modal.wait(
            "Emprunter ce dossier...",
            service.borrowFile({
                borrower: file.borrower,
                comment: file.comment ?? "",
                id: file.id
            })
        )
    } else {
        await Modal.wait(
            "Restituer ce dossier...",
            service.releaseFile(file.id)
        )
    }
    window.location.reload()
}
