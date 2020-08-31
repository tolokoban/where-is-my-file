# WIMF - Where is my file?

Imagine you have a library in your company with useful books that everybody can consult and take to his/her desk.  
When you need y book for yourself, the first think you want to know is where is it. It can be at the library, of on the desk of any colleague.
This App' will tell you where you can find your file.

For this to work, you need to stock a QRCode on each book of your library.
And anytime someone takes a book from the library, he/she have to scan the QRCode to let the system know that the book is now out of the library.
In the same way, you will have to scan the QRCode again when you will return the book to the library.

## Usage

### With URI param `id=123`

The URI param `id` is the file ID.

### Direct access without URI params

#### Config screen

Set the server hostname and the user nickname.

## Types

```typescript
interface ISettings {
  hostname: string
  username: string
}

interface IFile {
  id: string
  title: string
  borrower?: string
  comment?: string
  date: number
}

interface IBorrowing {
  id: string
  borrower: string
  comment: string
}
```

## Service

### `getInfo(fileId: string): IFile | null`

Get info on a file. Return `null` if such a file does not exist.

### `listAllFiles(): IFile[]`

Return a list of all the existing files.

### `listBorrowedFiles(): IFile[]`

Return a list of files that are currently borrowed by someone.

### `borrowFile(action: IBorrowing): IFile`

Declare a file as borrowed by someone.

### `releaseFile(fileId: string): IFile`

Declare a file as being in the library.
