"use client";
import { useDrag } from "react-dnd";

interface NameProps {
  id: string;
  name: string;
}

const NameList: React.FC<NameProps> = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "name",
    item: { id, name },
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

export default NameList;
