import { Suspense } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import { ListItemType } from "./data";

import { listAtom } from "./atoms";

import Detail from "./detail/Detail";
import { selectDetailIdAtom, loadableDetailsAtom } from "./detail/atoms";

const ListItem = ({ id, latest }: ListItemType) => {
  const selectDetailId = useSetAtom(selectDetailIdAtom);
  return (
    <div>
      <button type="button" onClick={() => selectDetailId(id)}>
        {id} / {latest}
      </button>
    </div>
  );
};

const List = () => {
  const list = useAtomValue(listAtom);
  useAtomValue(loadableDetailsAtom);
  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>
          <ListItem {...item} />
          <hr />
        </div>
      ))}
    </div>
  );
};

const App = () => (
  <Suspense fallback="Loading...">
    <div className="App">
      <List />
      {new Date().toISOString()}
      <div style={{ paddingTop: 40, backgroundColor: "grey" }}>
        <Suspense fallback="Loading detail...">
          <Detail />
        </Suspense>
      </div>
    </div>
  </Suspense>
);

export default App;
