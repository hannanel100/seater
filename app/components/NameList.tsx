import React from "react";
import NameListItem from "./NameListItem";
import { Name } from "../types";

type NameListProps = {
  names: Name[];
};
export default function NameList({ names }: NameListProps) {
  return (
    <div className="w-1/4 mr-4">
      <h2 className="text-lg font-bold mb-2">Names</h2>
      <div className="bg-gray-100 p-2 rounded">
        {names.map((name) => name && <NameListItem key={name} name={name} />)}
      </div>
    </div>
  );
}
