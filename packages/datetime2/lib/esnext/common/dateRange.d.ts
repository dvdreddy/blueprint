export declare type DateRange = [Date | null, Date | null];
export declare type NonNullDateRange = [Date, Date];
export declare function isNonNullRange(range: DateRange): range is NonNullDateRange;
