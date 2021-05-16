import ServiceInterface, { IBorrowing, IFile } from "./contract/service"

const URL = "http://localhost:7474/wimf/"

export default class Service implements ServiceInterface {
    async createFile(title: string): Promise<IFile> {
        return await exec("add", { title })
        // const files = await this.listAllFiles()
        // const maxId = files
        //     .map(f => f.id)
        //     .reduce((acc: number, val: number) => Math.max(acc, val), 0)
        // const file: IFile = {
        //     id: maxId + 1,
        //     title,
        //     date: Date.now()
        // }
        // files.unshift(file)
        // await set("all-files", files)
        // return file
    }

    async deleteFile(fileId: number): Promise<boolean> {
        return await exec("del", { id: fileId })
    }

    async getNickname(): Promise<string | null> {
        return await get("nickname", null)
    }

    async setNickname(nickname: string): Promise<void> {
        await set("nickname", nickname)
    }

    async getInfo(fileId: number): Promise<IFile | null> {
        return await exec("get", { id: fileId })
    }

    async listAllFiles(): Promise<IFile[]> {
        const data = await exec("list")
        return data
        // return await get("all-files", FILES)
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

const FILES: IFile[] = [
    {
        id: 1,
        title: "Projet Martony",
        date: Date.now()
    },
    {
        id: 2,
        title: "Stade de Gerland",
        date: Date.now()
    },
    {
        id: 3,
        title: "Cave de Johnny",
        date: Date.now()
    },
    {
        id: 4,
        title: "Jardins suspendus de Babylone",
        date: Date.now(),
        borrower: "Henry"
    },
    {
        id: 5,
        title: "Place des grands hommes",
        date: Date.now()
    },
    {
        id: 6,
        title: "Litige avec Jacqueline",
        date: Date.now()
    },
    {
        id: 7,
        title: "Succession hyper tendue",
        date: Date.now()
    }
]

async function get<T>(name: string, defaultValue: T): Promise<T> {
    await sleep()
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
    await sleep()
}

async function sleep(): Promise<void> {
    return new Promise(resolve => window.setTimeout(resolve, Math.random() * 2))
}
