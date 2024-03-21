import { seats, initialNames } from "./constants";

export type Seats = typeof seats;
export type Key = (typeof seats)[number];
export type Name = (typeof initialNames)[number];
export type Values = { name: (typeof initialNames)[number] | null };
export type SeatsCombination = {
  [K in Key]: Values;
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

export type Parashat = {
  title: string;
  date: string;
};
