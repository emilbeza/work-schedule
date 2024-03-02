import { Checkbox } from "antd";
import { DeletableItemButton, DeletableItemRow, StrikethroughSpan } from "./common/DeletableUtils";
import { useState } from "react";

type Props = {
    value: string;
    label?: string;
    onDelete: (value: string) => void;
    onToggle: (value: string, checked: boolean) => void;
    checked: boolean;
};

export function DeletableCheckbox({ value, label = value, checked, onDelete, onToggle }: Props) {
    const [isStrikethrough, setIsStrikethrought] = useState(false);

    return (
        <DeletableItemRow>
            <Checkbox
                value={value}
                checked={checked}
                onChange={(e) => {
                    onToggle(value, e.target.checked);
                }}
            >
                {isStrikethrough ? <StrikethroughSpan>{label}</StrikethroughSpan> : <span>{label}</span>}
            </Checkbox>
            <DeletableItemButton
                onClick={() => onDelete(value)}
                onMouseOver={() => setIsStrikethrought(true)}
                onMouseOut={() => setIsStrikethrought(false)}
            >
                -
            </DeletableItemButton>
        </DeletableItemRow>
    );
}
