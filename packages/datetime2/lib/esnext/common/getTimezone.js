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
import memoize from "lodash/memoize";
/**
 * Gets the users current time zone, for example "Europe/Oslo".
 * This is currently backed by the browser or computer's locale setting.
 */
export const getCurrentTimezone = memoize(guessTimezone);
function guessTimezone() {
    // N.B. getting time zone from the Intl api is not supported in IE (it returns undefined)
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
}
//# sourceMappingURL=getTimezone.js.map