import { DateRange } from "./dateRange";
export declare function clone(d: Date): Date;
export declare function isDateValid(date: Date | false | null): date is Date;
export declare function isSameTime(d1: Date | null, d2: Date | null): boolean;
export declare function isDayInRange(date: Date | null, dateRange: DateRange, exclusive?: boolean): boolean;
