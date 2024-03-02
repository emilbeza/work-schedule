import { useLocalStorage } from "./useLocalStorage";

export function useShifts() {
    const [shifts, setShifts] = useLocalStorage<string[]>("shifts", []);

    function addShift(shift: string) {
        if (shift.length === 0) return;
        if (shifts.includes(shift)) return;
        setShifts((prev) => [...prev, shift]);
    }

    function removeShift(shift: string) {
        setShifts((prev) => prev.filter((s) => s !== shift));
    }

    return [shifts, addShift, removeShift] as const;
}
