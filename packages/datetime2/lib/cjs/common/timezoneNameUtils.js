"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialTimezoneItems = exports.mapTimezonesWithNames = exports.getTimezoneNames = exports.getTimezoneShortName = void 0;
var tslib_1 = require("tslib");
var date_fns_tz_1 = require("date-fns-tz");
var getTimezone_1 = require("./getTimezone");
var timezoneItems_1 = require("./timezoneItems");
var CURRENT_DATE = Date.now();
var LONG_NAME_FORMAT_STR = "zzzz";
var SHORT_NAME_FORMAT_STR = "zzz";
function getTimezoneShortName(tzIanaCode, date) {
    return (0, date_fns_tz_1.formatInTimeZone)(date !== null && date !== void 0 ? date : CURRENT_DATE, tzIanaCode, SHORT_NAME_FORMAT_STR);
}
exports.getTimezoneShortName = getTimezoneShortName;
/**
 * Augments a simple {@link Timezone} metadata object with long and short names formatted by `date-fns-tz`.
 */
function getTimezoneNames(tz, date) {
    if (date === void 0) { date = CURRENT_DATE; }
    return tslib_1.__assign(tslib_1.__assign({}, tz), { longName: (0, date_fns_tz_1.formatInTimeZone)(date, tz.ianaCode, LONG_NAME_FORMAT_STR), shortName: (0, date_fns_tz_1.formatInTimeZone)(date, tz.ianaCode, SHORT_NAME_FORMAT_STR) });
}
exports.getTimezoneNames = getTimezoneNames;
var mapTimezonesWithNames = function (date, timezones) { return timezones.map(function (tz) { return getTimezoneNames(tz, date); }); };
exports.mapTimezonesWithNames = mapTimezonesWithNames;
function getInitialTimezoneItems(date, showLocalTimezone) {
    var systemTimezone = (0, getTimezone_1.getCurrentTimezone)();
    var localTimezone = showLocalTimezone
        ? timezoneItems_1.TIMEZONE_ITEMS.find(function (timezone) { return timezone.ianaCode === systemTimezone; })
        : undefined;
    var localTimezoneItem = localTimezone !== undefined
        ? tslib_1.__assign(tslib_1.__assign({}, localTimezone), { longName: "Current timezone", shortName: (0, date_fns_tz_1.formatInTimeZone)(date !== null && date !== void 0 ? date : CURRENT_DATE, localTimezone.ianaCode, SHORT_NAME_FORMAT_STR) }) : undefined;
    var minimalTimezoneItemsWithNames = (0, exports.mapTimezonesWithNames)(date, timezoneItems_1.MINIMAL_TIMEZONE_ITEMS).filter(function (tz) { return tz.ianaCode !== (localTimezoneItem === null || localTimezoneItem === void 0 ? void 0 : localTimezoneItem.ianaCode); });
    return localTimezoneItem === undefined
        ? minimalTimezoneItemsWithNames
        : tslib_1.__spreadArray([localTimezoneItem], minimalTimezoneItemsWithNames, true);
}
exports.getInitialTimezoneItems = getInitialTimezoneItems;
//# sourceMappingURL=timezoneNameUtils.js.map