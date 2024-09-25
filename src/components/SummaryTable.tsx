import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { GenerateDatesFromCurrentMonth } from "../utils/generate-dates-from-year-biginning";
import { HabitDay } from "./HabitDay";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = GenerateDatesFromCurrentMonth();

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-full flex justify-center flex-col">
      <div className="text-2xl font-bold text-zinc-400 mb-4 flex justify-center">
        {dayjs().format("DD [de] MMMM YYYY")}
      </div>
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="grid grid-rows-7 grid-flow-row gap-3">
          {weekDays.map((weekDay, i) => (
            <div
              key={`${weekDay}-${i}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          ))}
        </div>

        <div className="grid grid-rows-7 grid-flow-col gap-3">
          {summaryDates.map((date) => {
            const dayInSummary = summary.find((day) =>
              dayjs(date).isSame(day.date, "day")
            );

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
