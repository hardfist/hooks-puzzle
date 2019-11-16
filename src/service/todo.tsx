import delay from "delay";
import { uuid } from "uuidv4";
export const fetchList = async (): Promise<Item[]> => {
  await delay(2000);
  return [
    {
      text: "react is good",
      id: uuid(),
      completed: false
    },
    {
      text: "mobx is awesome",
      id: uuid(),
      completed: true
    }
  ];
};
export const fetchDetail = async (id: string): Promise<Description> => {
  await delay(1000);
  return {
    id,
    description: `you are ${id}`
  };
};
