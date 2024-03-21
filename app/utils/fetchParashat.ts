import { HebcalResponse, Parashat } from "../types";

/**
 * Fetch the parashat for the current week.
 *
 * @returns A promise that resolves to a {@link Parashat} object
 */
export const fetchParashat = async (): Promise<Parashat> => {
  const date = new Date();
  const firstDay = date.getDate() - date.getDay();
  const lastDay = firstDay + 6;
  const currentMonth = date.getMonth() + 1;
  let formattedCurrentMonth;
  // if current month is less than 10 add 0 before the month
  if (currentMonth < 10) {
    formattedCurrentMonth = `0${currentMonth}`;
  } else {
    formattedCurrentMonth = currentMonth;
  }
  const currentYear = date.getFullYear();

  const url = `https://www.hebcal.com/hebcal?v=1&cfg=json&year=now&s=on&start=${currentYear}-${formattedCurrentMonth}-${firstDay}&end=${currentYear}-${formattedCurrentMonth}-${lastDay}`;
  try {
    const response = await fetch(url);
    const data = (await response.json()) as HebcalResponse;
    console.log("🚀 ~ fetchParashat ~ data:", data);
    return {
      title: data.items[0].hebrew,
      date: data.items[0].date,
    };
  } catch (error) {
    console.log(error);
    return {
      title: "פרשת השבוע",
      date: "",
    };
  }
};
