const data = [
  { id: 0, details: ["latest 0"] },
  { id: 1, details: ["latest 1"] },
  { id: 2, details: ["latest 2"] },
  { id: 3, details: ["latest 3"] },
  { id: 4, details: ["latest 4"] },
  { id: 5, details: ["latest 5"] },
];

export type DataItem = (typeof data)[number];
export type ListItemType = { id: number; latest: string };

export const fetchList = (): Promise<ListItemType[]> =>
  new Promise((r) => {
    setTimeout(() => {
      r(data.map(({ id, details }) => ({ id, latest: details[0] })));
    }, 1000);
  });

export const fetchDetail = (id: number): Promise<DataItem> =>
  new Promise((r) => {
    setTimeout(() => {
      const found = data.find((item) => item.id === id);
      if (!found) throw new Error("unexpected");
      r({
        ...found,
        details: [...found.details, `${new Date().toISOString()}`],
      });
    }, 4000);
  });
