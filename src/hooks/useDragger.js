import { useEffect, useRef } from "react";

export const useDragger = (ref) => {
  const isClicked = useRef(false);
  const coords = useRef({ x: 0, y: 0, x0: 0, y0: 0 });

  useEffect(() => {
    const canvas = ref.current;

    const onPointerDown = (e) => {
      const tile = e.target.closest( '.tile' );

      if ( tile ) {
        isClicked.current = true;
        coords.current.x = e.clientX;
        coords.current.y = e.clientY;
        coords.current.x0 = tile.offsetLeft;
        coords.current.y0 = tile.offsetTop;
      }
    }

    const onPointerMove = (e) => {
      const tile = e.target.closest( '.tile' );

      if ( tile ) {
        if (e.target.closest( '[data-draggable="false"]' )) return;
        if (!isClicked.current) return;

        tile.setPointerCapture(e.pointerId); // IMPORTANT!

        const nextX = e.clientX - coords.current.x + coords.current.x0;
        const nextY = e.clientY - coords.current.y + coords.current.y0;

        tile.style.top = `${nextY}px`;
        tile.style.left = `${nextX}px`;
      }
    }

    const onPointerUp = (e) => {
      const tile = e.target.closest( '.tile' );

      if ( tile ) {
        isClicked.current = false;
      }
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerUp);
    };
  }, []);
}
