function short(date: Date): string {
    return `${date.getDate()} ${
        MONTHES[date.getMonth()]
    } à ${date.getHours()}:${pad(date.getMinutes())}`
}

const EXPORT = { short }

export default EXPORT

const MONTHES = [
    "jan.",
    "fév.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sep.",
    "oct.",
    "nov.",
    "déc."
]

function pad(value: number): string {
    if (value < 10) return `0${value}`
    return `${value}`
}
