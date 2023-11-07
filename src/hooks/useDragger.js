import { useEffect, useRef } from "react";

export const useDragger = (ref) => {
  const isClicked = useRef(false);

  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  });

  useEffect(() => {
    const target = ref.current;
    if (!target) throw new Error("Target element doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("Target element must have a parent");

    const onPointerDown = (e) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
      target.style.zIndex = 1000;
    }

    const onPointerUp = (e) => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
      target.style.zIndex = 100;
    }

    const onPointerMove = (e) => {
      if (e.target.closest( '[data-draggable="false"]' )) return;
      if (!isClicked.current) return;

      target.setPointerCapture(e.pointerId); // IMPORTANT!

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
    }

    target.addEventListener('pointerdown', onPointerDown);
    target.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerUp);

    return () => {
      target.removeEventListener('pointerdown', onPointerDown);
      target.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerUp);
    };
  }, []);
}
