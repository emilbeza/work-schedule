import { Button, Input } from "antd";
import { styled } from "styled-components";
import { usePeople } from "../../hooks/usePeople";
import { useState } from "react";
import { DeletableCheckbox } from "../DeletableCheckbox";

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
    width: 100%;
`;

const Row = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const CheckboxGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem !important;
`;

type Props = {
    people: string[];
    setPeople: (people: string[]) => void;
};

export function PeopleControls({ people: selectedPeople, setPeople }: Props) {
    const [people, addPerson, removePerson] = usePeople();
    const [enteredPerson, setEnteredPerson] = useState("");

    function togglePerson(person: string, checked: boolean) {
        if (checked) {
            setPeople([...selectedPeople, person]);
        } else {
            setPeople(selectedPeople.filter((p) => p !== person));
        }
    }

    function onDelete(person: string) {
        removePerson(person);
        setPeople(selectedPeople.filter((p) => p !== person));
    }

    function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== "Enter") return;
        addPerson(enteredPerson);
        setEnteredPerson("");
    }

    return (
        <>
            <ControlWrapper>
                <Label>Ludzie:</Label>
                {!!people.length && (
                    <CheckboxGroup>
                        {people.map((person) => (
                            <DeletableCheckbox
                                key={person}
                                value={person}
                                onDelete={onDelete}
                                checked={selectedPeople.includes(person)}
                                onToggle={togglePerson}
                            />
                        ))}
                    </CheckboxGroup>
                )}
            </ControlWrapper>
            <Row>
                <Input
                    value={enteredPerson}
                    placeholder="Dodaj nową osobę"
                    onChange={(e) => setEnteredPerson(e.target.value)}
                    onKeyDown={handleEnterKey}
                />
                <Button
                    type="primary"
                    disabled={!enteredPerson.length}
                    onClick={() => {
                        addPerson(enteredPerson);
                        setEnteredPerson("");
                    }}
                >
                    +
                </Button>
            </Row>
        </>
    );
}
