"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimezone = exports.TimezoneDisplayFormat = void 0;
var tslib_1 = require("tslib");
/**
 * @fileoverview These APIs are DEPRECATED and the code is frozen.
 * All changes & bugfixes should be made to @blueprintjs/datetime2 instead.
 */
/* eslint-disable deprecation/deprecation */
var moment = tslib_1.__importStar(require("moment-timezone"));
var timezoneMetadata_1 = require("./timezoneMetadata");
// eslint-disable-next-line @typescript-eslint/no-redeclare
exports.TimezoneDisplayFormat = {
    /** Abbreviation format: `"HST"` */
    ABBREVIATION: "abbreviation",
    /** Composite format: `"Pacific/Honolulu (HST) -10:00"` */
    COMPOSITE: "composite",
    /** Name format: `"Pacific/Honolulu"` */
    NAME: "name",
    /** Offset format: `"-10:00"` */
    OFFSET: "offset",
};
/** @deprecated use @blueprintjs/datetime2 */
function formatTimezone(timezone, date, displayFormat) {
    if (!timezone || !moment.tz.zone(timezone)) {
        return undefined;
    }
    var _a = (0, timezoneMetadata_1.getTimezoneMetadata)(timezone, date), abbreviation = _a.abbreviation, offsetAsString = _a.offsetAsString;
    switch (displayFormat) {
        case exports.TimezoneDisplayFormat.ABBREVIATION:
            // Fall back to the offset when there is no abbreviation.
            return abbreviation !== undefined ? abbreviation : offsetAsString;
        case exports.TimezoneDisplayFormat.NAME:
            return timezone;
        case exports.TimezoneDisplayFormat.OFFSET:
            return offsetAsString;
        case exports.TimezoneDisplayFormat.COMPOSITE:
            return "".concat(timezone).concat(abbreviation ? " (".concat(abbreviation, ")") : "", " ").concat(offsetAsString);
    }
}
exports.formatTimezone = formatTimezone;
//# sourceMappingURL=timezoneDisplayFormat.js.map