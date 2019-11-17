import { observable, runInAction, toJS, computed } from "mobx";
import { useMount } from "react-use";
import { expr } from "mobx-utils";
import React, { useState, useEffect } from "react";
import { fetchList } from "../../service/todo";
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
  const doublePos = expr(() => {
    return {
      x: pos.x * 2,
      y: pos.y * 2
    };
  });

  useMount(() => {
    window.addEventListener("mousemove", update);
    return () => {
      window.removeEventListener("mousemove", update);
    };
  });

  return { pos, doublePos: doublePos };
}
function useFetch(id: string) {
  const [state] = useState(
    observable<{
      isLoading: boolean;
      post?: Item[];
    }>({
      isLoading: true
    })
  );
  useEffect(() => {
    const fetchData = async () => {
      state.isLoading = true;
      state.post = await fetchList();
      state.isLoading = false;
    };
    fetchData();
  }, [id]);
  return state;
}

export const Mouse = observer(() => {
  const { pos, doublePos } = useMousePosition();
  const result = useFetch("1");
  console.log("result:", result);
  return (
    <div>
      x: {pos.x} y: {pos.y}
      <br />
      2x: {doublePos.x}
      2y: {doublePos.y}
      {result.isLoading && <div>....loading</div>}
      {result.post && result.post.map(x => x.text)}
    </div>
  );
});
