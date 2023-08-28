export const useDragHelper = () => {
  const mathUtils = useMathUtils();

  let dragArea: HTMLElement;
  let dragElement: HTMLElement;
  let initialElementX: number;
  let initialElementY: number;
  let initialCursorX: number;
  let initialCursorY: number;

  const startDrag = (e: MouseEvent | TouchEvent, area: HTMLElement) => {
    dragArea = area;
    dragElement = e.currentTarget as HTMLElement;

    if (e instanceof MouseEvent) {
      initialCursorX = e.clientX;
      initialCursorY = e.clientY;
    } else if (e instanceof TouchEvent) {
      initialCursorX = e.changedTouches[0].clientX;
      initialCursorY = e.changedTouches[0].clientY;
    }

    initialElementX = dragElement.style.left
      ? parseFloat(dragElement.style.left.slice(0, -1))
      : 0;
    initialElementY = dragElement.style.top
      ? parseFloat(dragElement.style.top.slice(0, -1))
      : 0;

    if (e instanceof MouseEvent) {
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
    } else if (e instanceof TouchEvent) {
      document.addEventListener("touchend", handleTouchEnd);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (e: MouseEvent) => {
    moveElementTo(e.clientX, e.clientY);
  };

  const handleTouchEnd = () => {
    document.removeEventListener("touchend", handleTouchEnd);
    document.removeEventListener("touchmove", handleTouchMove);
  };

  const handleTouchMove = (e: TouchEvent) => {
    moveElementTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  };

  const moveElementTo = (clientX: number, clientY: number) => {
    const dragAreaRect = dragArea.getBoundingClientRect();

    // calculate move offset
    const offsetX = clientX - initialCursorX;
    const offsetY = clientY - initialCursorY;

    const position = mathUtils.percentToPx(
      {
        x: initialElementX,
        y: initialElementY,
      },
      dragAreaRect.width,
      dragAreaRect.height,
    );

    setElementPosition(dragElement, position.x + offsetX, position.y + offsetY);
  };

  const setElementPosition = (element: HTMLElement, x: number, y: number) => {
    const dragAreaRect = dragArea.getBoundingClientRect();

    const position = mathUtils.pxToPercent(
      { x, y },
      dragAreaRect.width,
      dragAreaRect.height,
    );

    element.style.left = `${position.x}%`;
    element.style.top = `${position.y}%`;
  };

  return {
    startDrag,
  };
};
