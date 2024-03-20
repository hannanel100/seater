"use client";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLocalStorage } from "@uidotdev/usehooks";
import NameList from "./NameList";
import Table from "./Table";
import { SeatsCombination, Keys, Values } from "../types";
import { seats, initialNames } from "../constants";
const initialSeatedNames: SeatsCombination = {
  Bottom1: null,
  Bottom2: null,
  Bottom3: "אמא",
  Bottom4: null,
  Left: null,
  Right: "אבא",
  Top1: null,
  Top2: null,
  Top3: null,
  Top4: null,
};
const Main: React.FC = () => {
  const [seatedNames, setSeatedNames] = useLocalStorage<SeatsCombination>(
    "seatedNames",
    initialSeatedNames
  );
  const [names, setNames] = useState<Values[]>(
    initialNames.filter((name) => !Object.values(seatedNames).includes(name))
  );
  const handleDrop = (id: Keys, name: Values) => {
    console.log("🚀 ~ handleDrop ~ name:", name);
    console.log("🚀 ~ handleDrop ~ id:", id);
    console.log("🚀 ~ handleDrop ~ seatedNames:", seatedNames);
    setSeatedNames({ ...seatedNames, [id]: name });
    setNames((prevNames) => prevNames.filter((n) => n !== name));
  };

  const handleUndrop = (id: Keys) => {
    if ((seatedNames as SeatsCombination)[id]) {
      const name = (seatedNames as SeatsCombination)[id];
      if (name) {
        setSeatedNames((prevNames) => ({ ...prevNames, [id]: null }));
        setNames((prevNames) => [...prevNames, name]);
      }
    }
  };

  useEffect(() => {
    console.log("🚀 ~ seatedNames", seatedNames);
  }, [seatedNames]);
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
          <div className="w-1/4 mr-4">
            <h2 className="text-lg font-bold mb-2">Names</h2>
            <div className="bg-gray-100 p-2 rounded">
              {names.map(
                (name) => name && <NameList key={name} id={name} name={name} />
              )}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Main;
