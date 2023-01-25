import { Timezone } from "./timezoneItems";
export interface TimezoneWithNames extends Timezone {
    longName: string;
    shortName: string;
}
export declare function getTimezoneShortName(tzIanaCode: string, date: Date | undefined): string;
/**
 * Augments a simple {@link Timezone} metadata object with long and short names formatted by `date-fns-tz`.
 */
export declare function getTimezoneNames(tz: Timezone, date?: Date | number | undefined): TimezoneWithNames;
export declare const mapTimezonesWithNames: (date: Date | undefined, timezones: Timezone[] | TimezoneWithNames[]) => TimezoneWithNames[];
export declare function getInitialTimezoneItems(date: Date | undefined, showLocalTimezone: boolean): TimezoneWithNames[];
