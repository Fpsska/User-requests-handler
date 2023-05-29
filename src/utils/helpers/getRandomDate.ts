export function generateRandomDate(start: Date, end: Date): Date {
    return new Date(
        start.getTime() - Math.floor(Math.random() * end.getTime())
    );
}
