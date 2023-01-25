/** @deprecated use @blueprintjs/datetime2 */
export declare type TimezoneDisplayFormat = "offset" | "abbreviation" | "name" | "composite";
export declare const TimezoneDisplayFormat: {
    /** Abbreviation format: `"HST"` */
    ABBREVIATION: "abbreviation";
    /** Composite format: `"Pacific/Honolulu (HST) -10:00"` */
    COMPOSITE: "composite";
    /** Name format: `"Pacific/Honolulu"` */
    NAME: "name";
    /** Offset format: `"-10:00"` */
    OFFSET: "offset";
};
/** @deprecated use @blueprintjs/datetime2 */
export declare function formatTimezone(timezone: string, date: Date, displayFormat: TimezoneDisplayFormat): string | undefined;
