import { atom } from "jotai";
import { fetchList } from "./data";

export const listAtom = atom(async () => {
  const list = await fetchList();
  return list;
});
