"use client";
import React from "react";
import TableSeat from "./TableSeat";
import { Key, Name, Seats, SeatsCombination, Values } from "../types";

interface TableProps {
  seatedNames: SeatsCombination | {};
  seats: Seats;
  handleDrop: (id: Key, name: Name) => void;
  handleUndrop: (name: Name) => void;
}

const Table: React.FC<TableProps> = ({
  seats,
  seatedNames,
  handleDrop,
  handleUndrop,
}) => {
  return (
    <div className="w-3/4">
      <h2 className="text-lg font-bold mb-2">Table</h2>
      <div className="grid grid-cols-4  gap-4 place-items-center">
        {seats.slice(0, 4).map((seat) => (
          <TableSeat
            key={seat}
            id={seat}
            seatedName={(seatedNames as SeatsCombination)[seat]}
            onDrop={handleDrop}
            onUndrop={handleUndrop}
          />
        ))}
        <TableSeat
          key="Left"
          id="Left"
          seatedName={(seatedNames as SeatsCombination).Left}
          onDrop={handleDrop}
          onUndrop={handleUndrop}
        />
        <div className="bg-gray-200 text-black lg:w-96 w-full  h-24 p-4 rounded col-span-2 grid place-content-center">
          Table
        </div>
        <TableSeat
          key="Right"
          id="Right"
          seatedName={(seatedNames as SeatsCombination).Right}
          onDrop={handleDrop}
          onUndrop={handleUndrop}
        />
        {seats.slice(5, 9).map((seat) => (
          <TableSeat
            key={seat}
            id={seat}
            seatedName={(seatedNames as SeatsCombination)[seat]}
            onDrop={handleDrop}
            onUndrop={handleUndrop}
          />
        ))}
      </div>
    </div>
  );
};

export default Table;
