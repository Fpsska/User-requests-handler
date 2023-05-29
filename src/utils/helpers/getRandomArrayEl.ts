export function getRandomArrayEl<T>(array: T[]): T {
    const randomNum = Math.floor(Math.random() * array.length);

    return array[randomNum];
}
