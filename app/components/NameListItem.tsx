"use client";
import { useDrag } from "react-dnd";
import { Name } from "../types";

interface NameProps {
  name: Name;
}

const NameListItem: React.FC<NameProps> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "name",
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move p-2 rounded text-black ${
        isDragging ? "bg-blue-200" : "bg-gray-200"
      }`}
    >
      {name}
    </div>
  );
};

export default NameListItem;
