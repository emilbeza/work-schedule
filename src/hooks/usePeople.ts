import { useLocalStorage } from "./useLocalStorage";

export function usePeople() {
    const [people, setPeople] = useLocalStorage<string[]>("people", []);

    function addPerson(person: string) {
        if (person.length === 0) return;
        if (people.includes(person)) return;
        setPeople((prev) => [...prev, person]);
    }

    function removePerson(person: string) {
        setPeople((prev) => prev.filter((p) => p !== person));
    }

    return [people, addPerson, removePerson] as const;
}
