import ServiceInterface, { IBorrowing, IFile } from "./contract/service"

const URL =
    window.location.hostname === "localhost"
        ? "http://localhost:7474/wimf/"
        : "https://tolokoban.org/wimf/"

export default class Service implements ServiceInterface {
    async createFile(title: string): Promise<IFile> {
        return await exec("add", { title })
    }

    async deleteFile(fileId: number): Promise<boolean> {
        return await exec("del", { id: fileId })
    }

    getNickname(): string {
        return get("nickname", "")
    }

    setNickname(nickname: string): void {
        set("nickname", nickname)
    }

    async getInfo(fileId: number): Promise<IFile | null> {
        return await exec("get", { id: fileId })
    }

    async listAllFiles(): Promise<IFile[]> {
        const data = await exec("list")
        return data
    }

    async borrowFile(action: IBorrowing): Promise<boolean> {
        return await exec("borrow", {
            id: action.id,
            borrower: action.borrower
        })
    }

    async releaseFile(fileId: number): Promise<boolean> {
        return await exec("release", {
            id: fileId
        })
    }
}

async function exec(
    service: string,
    params: { [key: string]: any } = {}
): Promise<any> {
    try {
        const response = await fetch(URL, {
            mode: "cors",
            method: "POST",
            cache: "no-cache",
            redirect: "follow",
            referrerPolicy: "no-referrer",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...params,
                cmd: service
            })
        })
        const data = await response.json()
        console.log(">>>", data)
        if (data.ko) throw data.ko
        return data.ok
    } catch (ex) {
        console.error(`Error calling service "${service}" with params`, params)
        console.error(ex)
        return null
    }
}

function get<T>(name: string, defaultValue: T): T {
    try {
        const value = window.localStorage.getItem(name)
        console.log("[service] name, value = ", name, value) // @FIXME: Remove this line written on 2021-05-16 at 16:33
        if (value === null) return defaultValue

        return JSON.parse(value)
    } catch (ex) {
        console.log(`Bad local storage "${name}":`, ex)
        return defaultValue
    }
}

async function set(name: string, value: any): Promise<void> {
    window.localStorage.setItem(name, JSON.stringify(value))
}
