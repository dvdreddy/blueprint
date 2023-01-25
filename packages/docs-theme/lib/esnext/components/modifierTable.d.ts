import * as React from "react";
export interface IModifierTableProps {
    /** Table body contents. */
    children?: React.ReactNode;
    /** Message to display when children is empty. */
    emptyMessage?: string;
    /** Title of the first column, describing the type of each row in the table. */
    title: string;
    /** Title of the second column */
    descriptionTitle?: string;
}
export declare const ModifierTable: React.FC<IModifierTableProps>;
