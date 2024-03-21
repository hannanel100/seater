"use client";
import React from "react";
import { useDrop } from "react-dnd";
import { Key, Name, Values } from "../types";

interface TableSeatProps {
  id: Key;
  seatedName: Values | null;
  onDrop: (id: Key, name: Name) => void;
  onUndrop: (name: Name) => void;
}

const TableSeat: React.FC<TableSeatProps> = ({
  id,
  seatedName,
  onDrop,
  onUndrop,
}) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "name",
      drop: (item: { name: Name }) => onDrop(id, item.name),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [seatedName]
  );

  const handleRemove = () => {
    if (seatedName && seatedName.name) {
      onUndrop(seatedName.name);
    }
  };

  return (
    <div
      ref={drop}
      className={`w-20 h-20 border-4 border-dashed ${
        isOver ? "border-green-500" : "border-gray-300"
      }  flex rounded-sm items-center justify-center relative`}
      id={id}
    >
      {seatedName && seatedName.name ? (
        <div className="text-sm">
          {seatedName.name}
          {
            /* {remove button when name is אבא or אמא} */
            seatedName.name !== "אבא" && seatedName.name !== "אמא" ? (
              <button
                className="absolute top-0 right-0 m-1 text-red-500 hover:text-red-700"
                onClick={handleRemove}
              >
                &times;
              </button>
            ) : null
          }
        </div>
      ) : null}
    </div>
  );
};

export default TableSeat;
