import { styled } from "styled-components";
import { Day } from "../utils";
import { card } from "../css";
import { Button } from "antd";

type Props = {
    startDay: number;
    daysInMonth: number;
    monthName: string;
    year: number;
    selectedDay: number;
    days: Map<number, Day>;
    handleDaySelect: (day: number) => void;
    togglePrintMode: () => void;
    printMode: boolean;
};

const Container = styled.div`
    ${card}
    width: auto;
    flex-grow: 1;
`;

const H1 = styled.h1`
    font-size: 2rem;
    margin: 0.5rem 0 0.5rem 0;
`;

const Table = styled.table`
    width: 100%;
    border-spacing: 0.5rem 1rem;
`;

const Td = styled.td<{ selected?: boolean; printMode?: boolean }>(
    ({ selected, printMode }) => `
    height: "100%";
    vertical-align: top;
    background-color: ${selected && !printMode ? "#e6f4ff" : "white"};
    cursor: pointer;
    width: 8vw;
    border-radius: 8px;
    border: 1px solid #ddd;

    &:hover {
        filter: brightness(0.97);
    }
`
);

const DayLabel = styled.div`
    font-weight: bold;
    font-size: 1.25rem;
`;

const DayNotes = styled.div`
    min-height: 80px;
    white-space: break-spaces;
    word-break: break-word;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

const DayBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const sundayOffset = 1; // offset because sunday is 0 in JS

export function Calendar({
    startDay,
    daysInMonth,
    monthName,
    year,
    selectedDay,
    days,
    handleDaySelect,
    togglePrintMode,
    printMode,
}: Props) {
    console.log("daysInMonth", daysInMonth);
    const weeksInMonth = Math.ceil((daysInMonth + startDay) / 7);
    const weeks = new Array(weeksInMonth).fill(null).map((_, weekIndex) => {
        const week = new Array(7).fill(null).map((_, dayIndex) => {
            const date = weekIndex * 7 + dayIndex + 1 + sundayOffset - startDay;
            return date < 1 || date > daysInMonth ? null : date;
        });

        return week;
    });

    return (
        <Container>
            <H1>
                {monthName} {year}
            </H1>

            <Table>
                <thead>
                    <tr>
                        <th>Poniedziałek</th>
                        <th>Wtorek</th>
                        <th>Środa</th>
                        <th>Czwartek</th>
                        <th>Piątek</th>
                        <th>Sobota</th>
                        <th>Niedziela</th>
                    </tr>
                </thead>

                <tbody>
                    {weeks.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((day, dayIndex) => {
                                if (day === null) return <td key={dayIndex} />;

                                const dayData = days.get(day);

                                return (
                                    <Td
                                        key={dayIndex}
                                        onClick={() => handleDaySelect(day)}
                                        selected={selectedDay === day}
                                        printMode={printMode}
                                    >
                                        <DayBlock>
                                            <DayLabel>{day}</DayLabel>
                                            <DayNotes>
                                                <div>{dayData?.shift}</div>
                                                <div>{dayData?.dayNotes}</div>
                                                <div>{dayData?.people?.join(", ")}</div>
                                            </DayNotes>
                                        </DayBlock>
                                    </Td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </Table>

            {printMode ? null : <Button onClick={() => togglePrintMode()}>Drukuj</Button>}
        </Container>
    );
}
