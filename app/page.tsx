import Main from "./components/Main";
import ParashatShavoa from "./components/ParashatShavoa";
import { HebcalResponse } from "./types";
import { fetchParashat } from "./utils/fetchParashat";

export default async function Home() {
  let data = await fetchParashat();
  const { date, title } = data;
  return (
    <div>
      <ParashatShavoa parashat={data && title} />
      <Main title={title} date={date} />
    </div>
  );
}
