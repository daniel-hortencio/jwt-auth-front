export function getNow() {
    const now = new Date()

    return {
        timeAsString: now,
        month: now.getMonth() + 1,
        day: now.getDate(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
    }
}