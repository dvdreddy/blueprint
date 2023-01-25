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
import * as moment from "moment-timezone";
// non-empty abbreviations that do not begin with -/+
var ABBR_REGEX = /^[^-+]/;
export function getTimezoneMetadata(timezone, date) {
    if (date === void 0) { date = new Date(); }
    var timestamp = date.getTime();
    var zone = moment.tz.zone(timezone);
    var zonedDate = moment.tz(timestamp, timezone);
    var offset = zonedDate.utcOffset();
    var offsetAsString = zonedDate.format("Z");
    // Only include abbreviations that are not just a repeat of the offset:
    // moment-timezone's `abbr` falls back to the time offset if a zone doesn't have an abbr.
    var abbr = zone.abbr(timestamp);
    var abbreviation = ABBR_REGEX.test(abbr) ? abbr : undefined;
    return {
        abbreviation: abbreviation,
        offset: offset,
        offsetAsString: offsetAsString,
        population: zone.population,
        timezone: timezone,
    };
}
//# sourceMappingURL=timezoneMetadata.js.map