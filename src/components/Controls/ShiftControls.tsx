import { Button, Input, Radio } from "antd";
import { styled } from "styled-components";
import { useShifts } from "../../hooks/useShifts";
import { useState } from "react";
import { DeletableRadioOption } from "../DeletableRadioOption";

const Label = styled.span`
    font-weight: bold;
    width: 100%;
`;

const ControlWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    flex-wrap: wrap;
`;

const Row = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const RadioGroup = styled(Radio.Group)`
    width: 100%;

    & > * {
        width: 100%;
    }
`;

const StyledSpace = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

type Props = {
    shift: string;
    setShift: (shift: string) => void;
};

const EMPTY = "";

export function ShiftControls({ shift, setShift }: Props) {
    const [shifts, addShift, removeShift] = useShifts();
    const [enteredShift, setEnteredShift] = useState(EMPTY);

    function onDelete(currentShift: string) {
        removeShift(currentShift);
        if (currentShift === shift) {
            setShift(EMPTY);
        }
    }

    function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== "Enter") return;
        addShift(enteredShift);
        setEnteredShift(EMPTY);
    }

    return (
        <>
            <ControlWrapper>
                <Label>Zmiana:</Label>
                <RadioGroup value={shift} onChange={(e) => setShift(e.target.value)}>
                    <StyledSpace>
                        <Radio value={EMPTY} key={EMPTY}>
                            Brak
                        </Radio>
                        {shifts.map((shift) => (
                            <DeletableRadioOption key={shift} value={shift} onDelete={onDelete} />
                        ))}
                    </StyledSpace>
                </RadioGroup>
            </ControlWrapper>

            <Row>
                <Input
                    value={enteredShift}
                    placeholder="Dodaj nową zmianę"
                    onChange={(e) => setEnteredShift(e.target.value)}
                    onKeyDown={handleEnterKey}
                />
                <Button
                    type="primary"
                    disabled={!enteredShift.length}
                    onClick={() => {
                        addShift(enteredShift);
                        setEnteredShift(EMPTY);
                    }}
                >
                    +
                </Button>
            </Row>
        </>
    );
}
