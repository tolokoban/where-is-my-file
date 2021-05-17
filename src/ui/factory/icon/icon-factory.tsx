/**
 * We can found material icons here:
 * https://materialdesignicons.com/
 */
import React from "react"

const DEFAULT_ICON: JSX.Element = (
    <svg viewBox="0 0 24 24" preserveAspectRatio="meet xMidYmid">
        <path
            fill="currentColor"
            d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"
        />
    </svg>
)

class IconFactory {
    private icons = new Map<string, JSX.Element>()

    register(name: string, svg: JSX.Element) {
        this.icons.set(name, svg)
    }

    registerFromPath(name: string, path: string) {
        this.icons.set(
            name,
            <svg viewBox="0 0 24 24" preserveAspectRatio="meet xMidYmid">
                <path fill="currentColor" d={path} />
            </svg>
        )
    }

    registerMany(icons: { [name: string]: string }) {
        for (const name of Object.keys(icons)) {
            const path = icons[name]
            this.registerFromPath(name, path)
        }
    }

    make(name: string): JSX.Element {
        return this.icons.get(name) ?? DEFAULT_ICON
    }
}

const factory = new IconFactory()

export default factory

factory.registerMany({
    add: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
    "arrow-left": "M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z",
    "arrow-right": "M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z",
    delete: "M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z",
    edit: "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",
    focus: "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,19H15V21H19A2,2 0 0,0 21,19V15H19M19,3H15V5H19V9H21V5A2,2 0 0,0 19,3M5,5H9V3H5A2,2 0 0,0 3,5V9H5M5,15H3V19A2,2 0 0,0 5,21H9V19H5V15Z",
    menu: "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",
    pause: "M14,19H18V5H14M6,19H10V5H6V19Z",
    play: "M8,5.14V19.14L19,12.14L8,5.14Z",
    refresh:
        "M19,8L15,12H18A6,6 0 0,1 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20A8,8 0 0,0 20,12H23M6,12A6,6 0 0,1 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4A8,8 0 0,0 4,12H1L5,16L9,12",
    snapshot:
        "M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z",
})
