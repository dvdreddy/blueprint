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
exports.valueAdapter = exports.onChangeAdapter = void 0;
var datetime_1 = require("@blueprintjs/datetime");
var getTimezone_1 = require("../../common/getTimezone");
var timezoneUtils_1 = require("../../common/timezoneUtils");
/**
 * Adapter for automated DateInput -> DateInput2 migrations.
 *
 * @param handler DateInput onChange handler
 * @returns DateInput2 onChange handler
 */
function onChangeAdapter(handler) {
    if (handler === undefined) {
        return noOp;
    }
    var tz = (0, getTimezone_1.getCurrentTimezone)();
    return function (newDate, isUserChange) { var _a; return handler((_a = (0, timezoneUtils_1.getDateObjectFromIsoString)(newDate, tz)) !== null && _a !== void 0 ? _a : null, isUserChange); };
}
exports.onChangeAdapter = onChangeAdapter;
/**
 * Adapter for automated DateInput -> DateInput2 migrations.
 *
 * @param value DateInput value
 * @param timePrecision (optional) DateInput timePrecision
 * @returns DateInput2 value
 */
function valueAdapter(value, timePrecision) {
    if (value == null) {
        return null;
    }
    var tz = (0, getTimezone_1.getCurrentTimezone)();
    var inferredTimePrecision = value.getMilliseconds() !== 0
        ? datetime_1.TimePrecision.MILLISECOND
        : value.getSeconds() !== 0
            ? datetime_1.TimePrecision.SECOND
            : value.getMinutes() !== 0
                ? datetime_1.TimePrecision.MINUTE
                : undefined;
    return (0, timezoneUtils_1.getIsoEquivalentWithUpdatedTimezone)(value, tz, timePrecision !== null && timePrecision !== void 0 ? timePrecision : inferredTimePrecision);
}
exports.valueAdapter = valueAdapter;
function noOp() {
    // nothing
}
//# sourceMappingURL=dateInput2MigrationUtils.js.map