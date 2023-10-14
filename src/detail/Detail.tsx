import { useAtomValue } from "jotai";

import { detail2Atom } from "./atoms";

const Detail = () => {
  const detail = useAtomValue(detail2Atom);
  if (!detail) return "no data";
  if (detail === "loading") return "loading";
  return (
    <div>
      <div>id: {detail.id}</div>
      {detail.details.map((d) => (
        <div>{d}</div>
      ))}
    </div>
  );
};

export default Detail;
