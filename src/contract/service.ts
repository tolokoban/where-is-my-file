export default interface ServiceInterface {
    getInfo(fileId: number): Promise<IFile | null>
    listAllFiles(): Promise<IFile[]>
    borrowFile(action: IBorrowing): Promise<boolean>
    releaseFile(fileId: number): Promise<boolean>
    deleteFile(fileId: number): Promise<boolean>
    createFile(title: string): Promise<IFile>
    getNickname(): string
    setNickname(nickname: string): void
}

export interface IFile {
    id: number
    title: string
    borrower?: string
    comment?: string
    date: number
}

export interface IBorrowing {
    id: number
    borrower: string
    comment: string
}
