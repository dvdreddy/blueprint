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
import { __assign, __spreadArray } from "tslib";
import { formatInTimeZone } from "date-fns-tz";
import { getCurrentTimezone } from "./getTimezone";
import { MINIMAL_TIMEZONE_ITEMS, TIMEZONE_ITEMS } from "./timezoneItems";
var CURRENT_DATE = Date.now();
var LONG_NAME_FORMAT_STR = "zzzz";
var SHORT_NAME_FORMAT_STR = "zzz";
export function getTimezoneShortName(tzIanaCode, date) {
    return formatInTimeZone(date !== null && date !== void 0 ? date : CURRENT_DATE, tzIanaCode, SHORT_NAME_FORMAT_STR);
}
/**
 * Augments a simple {@link Timezone} metadata object with long and short names formatted by `date-fns-tz`.
 */
export function getTimezoneNames(tz, date) {
    if (date === void 0) { date = CURRENT_DATE; }
    return __assign(__assign({}, tz), { longName: formatInTimeZone(date, tz.ianaCode, LONG_NAME_FORMAT_STR), shortName: formatInTimeZone(date, tz.ianaCode, SHORT_NAME_FORMAT_STR) });
}
export var mapTimezonesWithNames = function (date, timezones) { return timezones.map(function (tz) { return getTimezoneNames(tz, date); }); };
export function getInitialTimezoneItems(date, showLocalTimezone) {
    var systemTimezone = getCurrentTimezone();
    var localTimezone = showLocalTimezone
        ? TIMEZONE_ITEMS.find(function (timezone) { return timezone.ianaCode === systemTimezone; })
        : undefined;
    var localTimezoneItem = localTimezone !== undefined
        ? __assign(__assign({}, localTimezone), { longName: "Current timezone", shortName: formatInTimeZone(date !== null && date !== void 0 ? date : CURRENT_DATE, localTimezone.ianaCode, SHORT_NAME_FORMAT_STR) }) : undefined;
    var minimalTimezoneItemsWithNames = mapTimezonesWithNames(date, MINIMAL_TIMEZONE_ITEMS).filter(function (tz) { return tz.ianaCode !== (localTimezoneItem === null || localTimezoneItem === void 0 ? void 0 : localTimezoneItem.ianaCode); });
    return localTimezoneItem === undefined
        ? minimalTimezoneItemsWithNames
        : __spreadArray([localTimezoneItem], minimalTimezoneItemsWithNames, true);
}
//# sourceMappingURL=timezoneNameUtils.js.map