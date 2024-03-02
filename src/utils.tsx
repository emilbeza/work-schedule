const currentDate = new Date();
const currentMonth = (currentDate.getMonth() + 1) % 12;
const currentYear = currentMonth === 0 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();

export type Day = {
    shift?: string;
    uncommonShiftNotes?: string;
    dayNotes?: string;
    people?: string[];
};

export function getCurrentMonth() {
    return currentMonth;
}

export function getCurrentYear() {
    return currentYear;
}
