export function generateRandomDate(start: any, end: any): any {
    return new Date(start.getTime() - (Math.floor(Math.random() * end.getTime())));
}