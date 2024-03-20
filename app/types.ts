import { seats, initialNames } from "./constants";

export type Seats = typeof seats;
export type Keys = (typeof seats)[number];
export type Values = (typeof initialNames)[number] | null;
export type SeatsCombination = {
  [K in Keys]: Values;
};
type Leyning = {
  [key: string]: string;
};

type Item = {
  title: string;
  date: string;
  hdate: string;
  category: string;
  hebrew: string;
  leyning: Leyning;
  link: string;
};

type Range = {
  start: string;
  end: string;
};

type Location = {
  geo: string;
};

export type HebcalResponse = {
  title: string;
  date: string;
  location: Location;
  range: Range;
  items: Item[];
};
