"use client";
import { useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { HebcalResponse } from "../types";
const ParashatShavoa = () => {
  const [parashat, setParashat] = useLocalStorage<string>("parashat", "");

  useEffect(() => {
    const fetchParashat = async () => {
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
        const data = (await response.json()) as unknown as HebcalResponse;
        if (parashat === "") {
          setParashat(data.items[0].hebrew);
        } else {
          // if the parashat is not the same as the current parashat, update the parashat
          if (parashat !== data.items[0].hebrew) {
            setParashat(data.items[0].hebrew);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchParashat();
  }, []);

  return (
    <div className="text-center">
      <h3 className="text-lg font-bold">פרשת השבוע</h3>
      <h1 className="text-4xl">{parashat}</h1>
    </div>
  );
};

export default ParashatShavoa;
