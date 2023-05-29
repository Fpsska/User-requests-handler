import { makeDateFormate } from './makeDateFormate';

// /. imports

export function makeDateCompare(date_1: string, date_2: string): number {
    // date_1, date_2 (dd/mm/yy)

    const date = new Date(makeDateFormate(date_1)); // (mm/dd/yy)
    const dateToCompare = new Date(makeDateFormate(date_2)); // (mm/dd/yy)

    if (date.getTime() < dateToCompare.getTime()) {
        return 1;
    } else if (date.getTime() > dateToCompare.getTime()) {
        return -1;
    } else {
        return 0;
    }
}
