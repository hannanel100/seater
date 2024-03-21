"use client";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLocalStorage } from "@uidotdev/usehooks";
import Table from "./Table";
import { SeatsCombination, Key, Name, Parashat } from "../types";
import { seats, initialNames } from "../constants";
import NameList from "./NameList";
import { formatDate } from "../utils/formatDate";
const initialSeatedNames: SeatsCombination = {
  Bottom1: { name: null },
  Bottom2: { name: null },
  Bottom3: { name: "אמא" },
  Bottom4: { name: null },
  Left: { name: null },
  Right: { name: "אבא" },
  Top1: { name: null },
  Top2: { name: null },
  Top3: { name: null },
  Top4: { name: null },
};
const Main = ({ title, date }: Parashat) => {
  const [seatedNames, setSeatedNames] = useLocalStorage<SeatsCombination>(
    "seatedNames",
    initialSeatedNames
  );
  const [lastChange, setLastChange] = useLocalStorage<string>("lastChange", "");
  const [names, setNames] = useState<Name[]>(
    initialNames.filter(
      (name) =>
        !Object.values(seatedNames).find(
          (seatedName) => seatedName?.name === name
        )
    )
  );
  /**
   * Handle drop action.
   * If the name is already seated, do nothing.
   * If the name is not seated, remove the first name from the available names list and add it to the seated names list.
   * @param id The id of the seat where the name is being dropped
   * @param seatedName The name being dropped, or null if it was not already seated
   */
  const handleDrop = (id: Key, seatedName: Name) => {
    if (!seatedName) {
      const name = names[0];
      setNames((prevNames) => prevNames.slice(1));
      setSeatedNames((prevNames) => ({ ...prevNames, [id]: { name } }));
    }
    if (seatedName) {
      setSeatedNames({ ...seatedNames, [id]: { name: seatedName } });
      setNames((prevNames) =>
        prevNames.filter((nameToFilter) => nameToFilter !== seatedName)
      );
    }
    // set lastChange in format of YYYY-MM-DDconst today = new Date()
    const today = new Date();
    const formattedDate = formatDate(today);
    setLastChange(formattedDate);
  };

  /**
   * Undrop a name from its seat.
   * It will set the name to null in the seatedNames object
   * and add the name back to the list of names.
   * @param name The name to undrop
   */
  const handleUndrop = (name: Name) => {
    const keysArray = Object.keys(seatedNames) as Key[];
    const key = keysArray.find((k) => seatedNames[k]?.name === name);
    if (key) {
      setSeatedNames((prevNames) => ({
        ...prevNames,
        [key]: { name: null },
      }));
      setNames((prevNames) => [...prevNames, name]);
    }
    const today = new Date();
    const formattedDate = formatDate(today);
    setLastChange(formattedDate);
  };
  const changeSeatsWhenParashatChanges = () => {
    // check if the lastChange is after the date of the parashat
    // if so, change everyones seating to the next seat and update lastChange
    if (new Date(lastChange) > new Date("2023-05-25")) {
      console.log("date changed");
      //  move each name to the next seat except for "אבא" and "אמא"
      // create an array of seats
      const seatsArray = Object.values(seatedNames).map(
        (seat) => seat?.name
      ) as Name[];
      console.log(
        "🚀 ~ changeSeatsWhenParashatChanges ~ seatsArray:",
        seatsArray
      );
      // move each name to the next seat
      const nextSeats = seatsArray.slice(1).concat(seatsArray.slice(0, 1));

      console.log(
        "🚀 ~ changeSeatsWhenParashatChanges ~ nextSeats:",
        nextSeats
      );

      const today = new Date();
      const formattedDate = formatDate(today);
      setLastChange(formattedDate);
      // if lastChange is before the date of the parashat, do nothing
    } else {
      console.log("date ok");
    }
  };

  changeSeatsWhenParashatChanges();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Drag and Drop Names</h1>
        <div className="flex">
          <Table
            seats={seats}
            seatedNames={seatedNames}
            handleDrop={handleDrop}
            handleUndrop={handleUndrop}
          />
          <NameList names={names} />
        </div>
      </div>
    </DndProvider>
  );
};

export default Main;
