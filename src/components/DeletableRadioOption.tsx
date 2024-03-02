import { Radio } from "antd";
import { useState } from "react";
import { DeletableItemButton, DeletableItemRow, StrikethroughSpan } from "./common/DeletableUtils";

type Props = {
    value: string;
    label?: string;
    onDelete: (value: string) => void;
};

export function DeletableRadioOption({ value, label = value, onDelete }: Props) {
    const [isStrikethrough, setIsStrikethrought] = useState(false);

    return (
        <DeletableItemRow>
            <Radio value={value} key={value}>
                {isStrikethrough ? <StrikethroughSpan>{label}</StrikethroughSpan> : <span>{label}</span>}
            </Radio>
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
