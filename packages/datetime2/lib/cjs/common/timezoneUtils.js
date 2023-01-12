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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDateToLocalEquivalentOfTimezoneTime = exports.convertLocalDateToTimezoneTime = exports.getDateObjectFromIsoString = exports.getIsoEquivalentWithUpdatedTimezone = void 0;
var tslib_1 = require("tslib");
var date_fns_tz_1 = require("date-fns-tz");
var isEmpty_1 = tslib_1.__importDefault(require("lodash/isEmpty"));
var datetime_1 = require("@blueprintjs/datetime");
var getTimezone_1 = require("./getTimezone");
var NO_TIME_PRECISION = "date";
var UTC_IANA_LABEL = "Etc/UTC";
var TIME_FORMAT_TO_ISO_FORMAT = (_a = {},
    _a[datetime_1.TimePrecision.MILLISECOND] = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    _a[datetime_1.TimePrecision.SECOND] = "yyyy-MM-dd'T'HH:mm:ssxxx",
    _a[datetime_1.TimePrecision.MINUTE] = "yyyy-MM-dd'T'HH:mmxxx",
    _a[NO_TIME_PRECISION] = "yyyy-MM-dd",
    _a);
/**
 * @see https://github.com/marnusw/date-fns-tz#formatintimezone
 * @returns a string of tokens which tell date-fns-tz's formatInTimeZone how to render a datetime
 */
function getFormatStr(timePrecision) {
    return TIME_FORMAT_TO_ISO_FORMAT[timePrecision !== null && timePrecision !== void 0 ? timePrecision : NO_TIME_PRECISION];
}
function getIsoEquivalentWithUpdatedTimezone(date, timezone, timePrecision) {
    var convertedDate = convertDateToLocalEquivalentOfTimezoneTime(date, timezone);
    return (0, date_fns_tz_1.formatInTimeZone)(convertedDate, timezone, getFormatStr(timePrecision));
}
exports.getIsoEquivalentWithUpdatedTimezone = getIsoEquivalentWithUpdatedTimezone;
function getDateObjectFromIsoString(value, timezone) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null || (0, isEmpty_1.default)(value)) {
        return null;
    }
    var date = new Date(value);
    // If the value is just a date format then we convert it to midnight in local time to avoid weird things happening
    if (value.length === 10) {
        // If it's just a date, we know it's interpreted as midnight UTC so we convert it to local time of that UTC time
        return convertLocalDateToTimezoneTime(date, UTC_IANA_LABEL);
    }
    return convertLocalDateToTimezoneTime(date, timezone);
}
exports.getDateObjectFromIsoString = getDateObjectFromIsoString;
/**
 * Converts a date in local timezone to represent better the passed through timezone
 * representation for the user, meaning if 8 AM local time is currently the date, and local time is Oslo
 * and the user has a default of UTC in selection, the new date should represent 7 AM.
 *
 * @param date the current existing date object
 * @param newTimezone the new timezone that we need to update the date to represent
 * @returns The date converted to match the new timezone
 */
function convertLocalDateToTimezoneTime(date, newTimezone) {
    var nowUtc = (0, date_fns_tz_1.zonedTimeToUtc)(date, (0, getTimezone_1.getCurrentTimezone)());
    return (0, date_fns_tz_1.utcToZonedTime)(nowUtc, newTimezone);
}
exports.convertLocalDateToTimezoneTime = convertLocalDateToTimezoneTime;
/**
 * Converts a date to match a new timezone selection. The date is the internal local time
 * representation for the user, meaning if 8 AM local time is currently selected, and local time is Oslo
 * and the user switches timezone to UTC, the new date should represent 9 AM in Oslo time.
 *
 * @param date the current existing date object
 * @param newTimezone the new timezone that the date should be converted to represent
 * @returns The date converted to match the new timezone
 */
function convertDateToLocalEquivalentOfTimezoneTime(date, newTimezone) {
    var nowUtc = (0, date_fns_tz_1.zonedTimeToUtc)(date, newTimezone);
    return (0, date_fns_tz_1.utcToZonedTime)(nowUtc, (0, getTimezone_1.getCurrentTimezone)());
}
exports.convertDateToLocalEquivalentOfTimezoneTime = convertDateToLocalEquivalentOfTimezoneTime;
//# sourceMappingURL=timezoneUtils.js.map