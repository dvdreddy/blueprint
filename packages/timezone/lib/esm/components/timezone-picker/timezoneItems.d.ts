import { IconName } from "@blueprintjs/core";
export declare type TimezoneItem = ITimezoneItem;
/**
 * Timezone-specific QueryList item
 *
 * @deprecated use TimezoneItem
 */
export interface ITimezoneItem {
    /** Key to be used as the rendered react key. */
    key: string;
    /** Text for the timezone. */
    text: string;
    /** Label for the timezone. */
    label: string;
    /** Optional icon for the timezone. */
    iconName?: IconName;
    /** The actual timezone. */
    timezone: string;
}
/**
 * Get a list of all timezone items.
 *
 * @param date the date to use when determining timezone offsets
 */
export declare function getTimezoneItems(date: Date): TimezoneItem[];
/**
 * Get a list of timezone items where there is one timezone per offset
 * and optionally the local timezone as the first item.
 * The most populous timezone for each offset is chosen.
 *
 * @param date the date to use when determining timezone offsets
 * @param includeLocalTimezone whether to include the local timezone
 */
export declare function getInitialTimezoneItems(date: Date, includeLocalTimezone: boolean): TimezoneItem[];
/**
 * Get the timezone item for the user's local timezone.
 *
 * @param date the date to use when determining timezone offsets
 */
export declare function getLocalTimezoneItem(date: Date): TimezoneItem | undefined;
