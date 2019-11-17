import { observable, autorun, runInAction, toJS } from "mobx";
import { useMount } from "react-use";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { debounce } from "lodash";

export function useMousePosition() {
  const [pos] = useState(
    observable({
      x: 0,
      y: 0
    })
  );
  const update = debounce((e: MouseEvent) => {
    runInAction(() => {
      pos.x = e.pageX;
      pos.y = e.pageY;
      console.log("x:", toJS(pos));
    });
  }, 100);
  useMount(() => {
    window.addEventListener("mousemove", update);
    return () => {
      window.removeEventListener("mousemove", update);
    };
  });

  return pos;
}

export const Mouse = observer(() => {
  const pos = useMousePosition();
  return (
    <div>
      x: {pos.x}
      y: {pos.y}
    </div>
  );
});
