import { atom } from "jotai";
import { loadable } from "jotai/utils";

import { listAtom } from "../atoms";
import { fetchDetail } from "../data";

export const detailIdAtom = atom<number | null>(null);
export const selectDetailIdAtom = atom(null, (get, set, id: number) => {
  set(detailIdAtom, id);
});

export const detailsAtom = atom(async (get) => {
  const list = await get(listAtom);
  const details = await Promise.all(list.map((item) => fetchDetail(item.id)));
  console.log(details);
  return details;
});
export const loadableDetailsAtom = loadable(detailsAtom);

export const detail2Atom = atom((get) => {
  const id = get(detailIdAtom);
  if (id === null) return null;
  const details = get(loadableDetailsAtom);
  if (details.state === "loading") return "loading";
  if (details.state === "hasError") throw new Error("error");
  const detail = details.data.find((d) => d.id === id);
  if (!detail) throw new Error("unexpected");
  return detail;
});

export const detailAtom = atom(async (get) => {
  const id = get(detailIdAtom);
  if (id === null) return null;
  const detail = await fetchDetail(id);
  return detail;
});
