import dayjs from "dayjs";

export function GenerateDatesFromYearBiginning() {
  const startDate = dayjs().startOf("year");
  const endDate = new Date();

  let dateRange = [];
  let compareDate = startDate;

  while (compareDate.isBefore(endDate)) {
    dateRange.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dateRange;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function GenerateDatesFromCurrentMonth() {
  const startDate = dayjs().startOf("month");
  const endDate = dayjs().endOf("month");;

  let dateRange = [];
  let compareDate = startDate;

  while (compareDate.isBefore(endDate)) {
    dateRange.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dateRange;
}
