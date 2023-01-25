/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
import { __spreadArray } from "tslib";
import * as moment from "moment-timezone";
import { getTimezoneMetadata } from "./timezoneMetadata";
/**
 * Get a list of all timezone items.
 *
 * @param date the date to use when determining timezone offsets
 */
export function getTimezoneItems(date) {
    return moment.tz
        .names()
        .map(function (timezone) { return getTimezoneMetadata(timezone, date); })
        .sort(function (a, b) { return a.offset - b.offset; })
        .map(toTimezoneItem);
}
/**
 * Get a list of timezone items where there is one timezone per offset
 * and optionally the local timezone as the first item.
 * The most populous timezone for each offset is chosen.
 *
 * @param date the date to use when determining timezone offsets
 * @param includeLocalTimezone whether to include the local timezone
 */
export function getInitialTimezoneItems(date, includeLocalTimezone) {
    var populous = getPopulousTimezoneItems(date);
    var local = getLocalTimezoneItem(date);
    return includeLocalTimezone && local !== undefined ? __spreadArray([local], populous, true) : populous;
}
/**
 * Get the timezone item for the user's local timezone.
 *
 * @param date the date to use when determining timezone offsets
 */
export function getLocalTimezoneItem(date) {
    var timezone = moment.tz.guess();
    if (timezone !== undefined) {
        var timestamp = date.getTime();
        var zonedDate = moment.tz(timestamp, timezone);
        var offsetAsString = zonedDate.format("Z");
        return {
            iconName: "locate",
            key: "".concat(timezone, "-local"),
            label: offsetAsString,
            text: "Current timezone",
            timezone: timezone,
        };
    }
    else {
        return undefined;
    }
}
/**
 * Get one timezone item per offset, using the most populous region when there is more
 * than one region for the offset.
 *
 * @param date the date to use when determining timezone offsets
 */
function getPopulousTimezoneItems(date) {
    // Filter out noisy timezones. See https://github.com/moment/moment-timezone/issues/227
    var timezones = moment.tz.names().filter(function (timezone) { return /\//.test(timezone) && !/Etc\//.test(timezone); });
    var timezoneToMetadata = timezones.reduce(function (store, zone) {
        store[zone] = getTimezoneMetadata(zone, date);
        return store;
    }, {});
    // reduce timezones array to maximum population per offset, for each unique offset.
    var maxPopPerOffset = timezones.reduce(function (maxPop, zone) {
        var data = timezoneToMetadata[zone];
        var currentMax = maxPop[data.offsetAsString];
        if (currentMax == null || data.population > timezoneToMetadata[currentMax].population) {
            maxPop[data.offsetAsString] = zone;
        }
        return maxPop;
    }, {});
    return (Object.keys(maxPopPerOffset)
        // get metadata object
        .map(function (k) { return timezoneToMetadata[maxPopPerOffset[k]]; })
        // sort by offset
        .sort(function (tz1, tz2) { return tz1.offset - tz2.offset; })
        // convert to renderable item
        .map(toTimezoneItem));
}
function toTimezoneItem(_a) {
    var abbreviation = _a.abbreviation, offsetAsString = _a.offsetAsString, timezone = _a.timezone;
    return {
        key: timezone,
        label: offsetAsString,
        text: timezone + (abbreviation ? " (".concat(abbreviation, ")") : ""),
        timezone: timezone,
    };
}
//# sourceMappingURL=timezoneItems.js.map