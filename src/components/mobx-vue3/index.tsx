import { observable } from "mobx";
import { useMount } from "react-use";
import React, { useState } from "react";
import { observer } from "mobx-react";

export function useMousePosition() {
  const [pos] = useState(
    observable({
      x: 0,
      y: 0
    })
  );
  function update(e: MouseEvent) {
    pos.x = e.pageX;
    pos.y = e.pageY;
  }
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
