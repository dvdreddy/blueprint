/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export var TimezoneDisplayFormat = {
    /**
     * Short name format: "HST", "EDT", etc.
     * Falls back to "GMT+/-offset" if there is no commonly used abbreviation.
     */
    ABBREVIATION: "abbreviation",
    /**
     * IANA timezone code: "Pacific/Honolulu", "America/New_York", etc.
     */
    CODE: "code",
    /**
     * Composite format: "Hawaii Time (HST) -10:00", "New York (EDT) -5:00", etc.
     * Omits abbreviation if there is no short name (it is redundant with offset).
     */
    COMPOSITE: "composite",
    /**
     * Long name format: "Hawaii-Aleutian Standard Time", "Eastern Daylight Time", "Coordinated Universal Time", etc.
     */
    LONG_NAME: "long-name",
    /**
     * @deprecated use {@link TimezoneDisplayFormat.CODE} instead
     */
    // eslint-disable-next-line deprecation/deprecation
    NAME: "name",
    /**
     * Offset format: "-10:00", "-5:00", etc.
     */
    OFFSET: "offset",
};
/**
 * Formats a timezone according to the specified display format to show in the default `<Button>` rendered as the
 * `<TimezoneSelect>` target element.
 */
export function formatTimezone(timezone, displayFormat) {
    if (timezone === undefined) {
        return undefined;
    }
    switch (displayFormat) {
        case TimezoneDisplayFormat.ABBREVIATION:
            return timezone.shortName;
        // eslint-disable-next-line deprecation/deprecation
        case TimezoneDisplayFormat.NAME:
            return timezone.ianaCode;
        case TimezoneDisplayFormat.OFFSET:
            return timezone.offset;
        case TimezoneDisplayFormat.CODE:
            return timezone.ianaCode;
        case TimezoneDisplayFormat.LONG_NAME:
            return timezone.longName;
        case TimezoneDisplayFormat.COMPOSITE:
            var shortName = timezone.shortName;
            // if the short name is just an offset (contains + or -) or equal to the label, omit it
            return /[-\+]/.test(shortName) || shortName === timezone.label
                ? "".concat(timezone.label, " ").concat(timezone.offset)
                : "".concat(timezone.label, " (").concat(timezone.shortName, ") ").concat(timezone.offset);
    }
}
//# sourceMappingURL=timezoneDisplayFormat.js.map