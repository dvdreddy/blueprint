import { DateInputProps, TimePrecision } from "@blueprintjs/datetime";
import type { DateInput2Props } from "./dateInput2";
/**
 * Adapter for automated DateInput -> DateInput2 migrations.
 *
 * @param handler DateInput onChange handler
 * @returns DateInput2 onChange handler
 */
export declare function onChangeAdapter(handler: DateInputProps["onChange"]): DateInput2Props["onChange"];
/**
 * Adapter for automated DateInput -> DateInput2 migrations.
 *
 * @param value DateInput value
 * @param timePrecision (optional) DateInput timePrecision
 * @returns DateInput2 value
 */
export declare function valueAdapter(value: DateInputProps["value"], timePrecision?: TimePrecision): DateInput2Props["value"];
