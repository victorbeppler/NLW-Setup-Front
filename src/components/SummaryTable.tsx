import { GenerateDatesFromYearBiginning } from "../utils/generate-dates-from-year-biginning";
import { HabitDay } from "./HabitDay";

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = GenerateDatesFromYearBiginning()

const minimumSummaryDate = 18 * 7;
const amountOfDays = minimumSummaryDate - summaryDates.length;

export function SummaryTable() {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekdays.map((weekday) => {
                    return (
                        <div className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                            {weekday}
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaryDates.map((date) => {
                    return (
                        <HabitDay />
                    );
                })
                }
                {amountOfDays > 0 && Array.from({ length: amountOfDays }).map(() => {
                    return (
                        <div className="w-10 h-10 bg-zinc-800 border-2 border-zinc-700 rounded-lg opacity-40 cursor-not-allowed" />
                    )

                })}
            </div>
        </div>
    );
}//1:34