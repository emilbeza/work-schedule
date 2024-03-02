import { Select } from "antd";
import { styled } from "styled-components";
import { LABEL_BY_MONTH_VALUE } from "../../consts";
import { getCurrentYear } from "../../utils";

const ControlWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    flex-wrap: wrap;
`;

const Label = styled.span`
    font-weight: bold;
`;

type Props = {
    month: number;
    setMonth: (month: number) => void;
    year: number;
    setYear: (year: number) => void;
};

const options = Object.entries(LABEL_BY_MONTH_VALUE).map(([value, label]) => ({
    value,
    label,
}));

const currentYear = getCurrentYear();

export function DateControls({ month, setMonth, year, setYear }: Props) {
    return (
        <>
            <ControlWrapper>
                <Label>Miesiąc:</Label>
                <Select value={String(month)} options={options} style={{ width: 120 }} onChange={(v) => setMonth(+v)} />
            </ControlWrapper>

            <ControlWrapper>
                <Label>Rok:</Label>
                <Select
                    value={String(year)}
                    options={[
                        { value: String(currentYear - 1), label: String(currentYear - 1) },
                        { value: String(currentYear), label: String(currentYear) },
                        { value: String(currentYear + 1), label: String(currentYear + 1) },
                    ]}
                    style={{ width: 120 }}
                    onChange={(v) => setYear(+v)}
                />
            </ControlWrapper>
        </>
    );
}
