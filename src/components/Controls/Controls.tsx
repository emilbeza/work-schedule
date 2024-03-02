import { Button } from "antd";
import { styled } from "styled-components";
import { card } from "../../css";
import { ShiftControls } from "./ShiftControls";
import { PeopleControls } from "./PeopleControls";
import { DateControls } from "./DateControls";

type Props = {
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
    setShift: (shift: string) => void;
    setPeople: (people: string[]) => void;
    onAccept: () => void;
    month: number;
    year: number;
    shift: string;
    people: string[];
};

const Container = styled.div`
    width: 300px;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: scroll;

    ${card}
`;

const Separator = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ddd;
`;

export function Controls({ month, year, shift, people, setMonth, setYear, setShift, setPeople, onAccept }: Props) {
    return (
        <Container>
            <DateControls month={month} setMonth={setMonth} year={year} setYear={setYear} />
            <Separator />

            <ShiftControls shift={shift} setShift={setShift} />
            <Separator />

            <PeopleControls people={people} setPeople={setPeople} />
            <Separator />

            <Button type="primary" onClick={onAccept} style={{ marginTop: "1rem" }}>
                Następny dzień
            </Button>
        </Container>
    );
}
