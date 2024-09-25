import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
import dayjs from "dayjs";
import { HabitList } from "./HabitList";
import { useEffect, useState } from "react";

interface HabitDayProps {
  date: Date;
  amount: number;
  defaultCompleted: number;
}

export function HabitDay({ date, amount, defaultCompleted }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);
  const [completedPercentage, setCompletedPercentage] = useState(0);

  useEffect(() => {
    if (amount > 0) {
      setCompleted(defaultCompleted);
      const percentage = Math.round((defaultCompleted / amount) * 100);
      console.log("PERCENT", percentage);
      setCompletedPercentage(percentage);
    } else {
      setCompletedPercentage(0);
    }
  }, [completed, amount]);

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());
  const isDateToday = dayjs(date).isSame(dayjs(), "day");
  const dayOfMonth = dayjs(date).format("DD");

  function handleCompletedChanged(newCompleted: number) {
    setCompleted(newCompleted);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background",
          {
            "bg-zinc-900 border-zinc-800":
              completedPercentage === 0 && isDateInPast,
            "bg-violet-900 border-violet-500":
              completedPercentage > 0 &&
              completedPercentage < 20 &&
              isDateInPast,
            "bg-violet-800 border-violet-500":
              completedPercentage >= 20 &&
              completedPercentage < 40 &&
              isDateInPast,
            "bg-violet-700 border-violet-500":
              completedPercentage >= 40 &&
              completedPercentage < 60 &&
              isDateInPast,
            "bg-violet-600 border-violet-500":
              completedPercentage >= 60 &&
              completedPercentage < 80 &&
              isDateInPast,
            "bg-violet-500 border-violet-400": completedPercentage >= 80,
            "w-10 h-10 border-2 border-zinc-800 rounded-lg opacity-40":
              !isDateToday,
            "bg-zinc-900 border-zinc-300": isDateToday,
          }
        )}
        disabled={!isDateToday && !isDateInPast}
      >
        {dayOfMonth}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <HabitList date={date} onCompletedChanged={handleCompletedChanged} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
