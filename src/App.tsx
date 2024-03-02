import { useEffect, useState } from "react";
import { Calendar } from "./components/Calendar";
import { styled } from "styled-components";
import { Controls } from "./components/Controls/Controls";
import { Day, getCurrentMonth, getCurrentYear } from "./utils";
import { LABEL_BY_MONTH_VALUE } from "./consts";

const Layout = styled.div`
    display: flex;
    padding: 2rem;
    gap: 2rem;
    max-height: 100vh;
`;

const EmptyDaysMap = new Map<number, Day>();

function App() {
    const [printMode, setPrintMode] = useState(false);

    const [days, setDays] = useState<Map<number, Day>>(EmptyDaysMap);
    const [month, setMonth] = useState(getCurrentMonth);
    const [year, setYear] = useState(getCurrentYear);

    // day data
    const [shift, setShift] = useState<string>("");
    const [uncommonShiftNotes, setUncommonShiftNotes] = useState("");
    const [dayNotes, setDayNotes] = useState("");
    const [people, setPeople] = useState<string[]>([]);

    const [selectedDay, setSelectedDay] = useState(1);

    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    console.log(`new Date(${year}, ${month}, 0).getDate();`, daysInMonth);
    const monthName = LABEL_BY_MONTH_VALUE[month as keyof typeof LABEL_BY_MONTH_VALUE];

    function setValuesOfTheDay(day: number) {
        const dayData = days.get(day);
        setShift(dayData?.shift || "");
        setUncommonShiftNotes(dayData?.uncommonShiftNotes || "");
        setDayNotes(dayData?.dayNotes || "");
        setPeople(dayData?.people || []);
    }

    function handleDaySelect(day: number) {
        setSelectedDay(day);
        setValuesOfTheDay(day);
    }

    function storeEnteredData() {
        setDays((days) => {
            const newDays = new Map(days);

            const newDay = {} as Day;
            if (shift) newDay.shift = shift;
            if (uncommonShiftNotes) newDay.uncommonShiftNotes = uncommonShiftNotes;
            if (dayNotes) newDay.dayNotes = dayNotes;
            if (people.length) newDay.people = people;

            newDays.set(selectedDay, newDay);
            return newDays;
        });
    }

    // shouldn't use useEffect here, but it's fine for now
    useEffect(() => {
        storeEnteredData();
    }, [shift, uncommonShiftNotes, dayNotes, people]);

    useEffect(() => {
        const exitPrintMode = () => {
            setPrintMode(false);
        };

        if (printMode) {
            window.addEventListener("afterprint", exitPrintMode);
            window.print();
        }

        return () => window.removeEventListener("afterprint", exitPrintMode);
    }, [printMode]);

    return (
        <>
            <Layout>
                <Calendar
                    startDay={startDay}
                    daysInMonth={daysInMonth}
                    monthName={monthName}
                    year={year}
                    selectedDay={selectedDay}
                    days={days}
                    handleDaySelect={handleDaySelect}
                    printMode={printMode}
                    togglePrintMode={() => setPrintMode(!printMode)}
                />
                {printMode ? null : (
                    <Controls
                        key={selectedDay}
                        month={month}
                        year={year}
                        shift={shift}
                        people={people}
                        setShift={setShift}
                        setMonth={setMonth}
                        setYear={setYear}
                        setPeople={setPeople}
                        onAccept={() => {
                            const nextDay = selectedDay + 1 < daysInMonth ? selectedDay + 1 : 1;
                            setSelectedDay(nextDay);
                            setValuesOfTheDay(nextDay);
                        }}
                    />
                )}
            </Layout>
        </>
    );
}

export default App;
