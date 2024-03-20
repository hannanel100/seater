"use client";
import React from "react";
import { useDrop } from "react-dnd";
import { Keys, Values } from "../types";

interface TableSeatProps {
  id: Keys;
  name: Values | null;
  onDrop: (id: Keys, name: Values) => void;
  onUndrop: (id: Keys) => void;
}

const TableSeat: React.FC<TableSeatProps> = ({
  id,
  name,
  onDrop,
  onUndrop,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "name",
    drop: (item: { name: Values }) => onDrop(id, item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleRemove = () => {
    if (name) {
      onUndrop(id);
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
      {name ? (
        <div className="text-sm">
          {name}
          {
            /* {remove button when name is אבא or אמא} */
            name !== "אבא" && name !== "אמא" ? (
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
