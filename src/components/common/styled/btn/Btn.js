import { useRef } from "react";

function Btns(props) {
  const enableClick = useRef(true);

  const getItems = (abc) => {
    const panel = abc.current;
    const panel_items = panel.children;
    const items = Array.from(panel_items);
    const len = items.length;
    const current_item = panel.querySelector(".on");
    const current_index = items.indexOf(current_item);
    return [panel, panel_items, len, current_item, current_index];
  };

  const moveUp = () => {
    enableClick.current = false;
    const [panel, panel_items, len, current_item, current_index] = getItems(
      props.panel
    );
    let next_index = null;
    current_index !== len - 1
      ? (next_index = current_index + 1)
      : (next_index = 0);

    if (!current_item) return;

    current_item.classList.remove("on");
    current_item.classList.add("up");
    panel_items[next_index].classList.add("down");

    setTimeout(() => {
      panel_items[next_index].classList.remove("down");
      panel_items[next_index].classList.add("on");
      panel.querySelector(".up").classList.remove("up");
      setTimeout(() => {
        enableClick.current = true;
      }, convertSpeed(props.panel.current.querySelector(".bg")));
    }, 500);
  };

  const moveDown = () => {
    enableClick.current = false;
    const [panel, panel_items, len, current_item, current_index] = getItems(
      props.panel
    );
    let prev_index = null;
    current_index !== 0
      ? (prev_index = current_index - 1)
      : (prev_index = len - 1);

    if (!current_item) return;

    current_item.classList.remove("on");
    current_item.classList.add("down");
    panel_items[prev_index].classList.add("up");

    setTimeout(() => {
      panel_items[prev_index].classList.remove("up");
      panel_items[prev_index].classList.add("on");
      panel.querySelector(".down").classList.remove("down");
      setTimeout(() => {
        enableClick.current = true;
      }, convertSpeed(props.panel.current.querySelector(".bg")));
    }, 500);
  };

  const convertSpeed = (el) => {
    const speed = parseFloat(getComputedStyle(el).transitionDuration) * 1000;
    return speed;
  };
  return (
    <>
      <a href="#" className="btnUp" onClick={enableClick && moveUp}>
        <span></span>
        <em>UP</em>
      </a>

      <a href="#" className="btnDown" onClick={enableClick && moveDown}>
        <span></span>
        <em>DOWN</em>
      </a>
    </>
  );
}

export default Btns;
