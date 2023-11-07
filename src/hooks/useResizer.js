import { useEffect, useRef } from "react";

export const useResizer = (ref) => {
  const drag = useRef({ x: "", y: "", active: false });
  const dims = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const container = ref.current;
    if (!container) throw new Error("Container element doesn't exist");

    const [target, resizer] = container.children;
    if (!target) throw new Error("Target element doesn't exist");
    if (!resizer) throw new Error("Resizer element doesn't exist");
  
    // *****

    function eventMoveHandler(e) {
      const { active, x, y } = drag.current;
      if (active) {
        const xDiff = Math.abs( x - e.clientX );
        const yDiff = Math.abs( y - e.clientY );
        const newW = ( x > e.clientX ) ? ( dims.current.w - xDiff ) : ( dims.current.w + xDiff );
        const newH = ( y > e.clientY ) ? ( dims.current.h - yDiff ) : ( dims.current.h + yDiff );

        container.style.width = newW + 'px';
        // container.style.height = newH + 'px';

        { // To keep aspect ratio
          container.style.height = 'auto';
          container.style.setProperty("aspect-ratio", "1/" + target.naturalHeight / target.naturalWidth);
        }
      }
    }

    function startResize(e) {
      resizer.setPointerCapture(e.pointerId); // IMPORTANT!
      drag.current = ({ ...drag.current, active: true, x: e.clientX, y: e.clientY });
      dims.current = ({ w: target.offsetWidth, h: target.offsetHeight });
    };

    function stopResize(e) {
      drag.current = ({ ...drag.current, active: false });
    };

    container.addEventListener('pointermove', eventMoveHandler);
    container.addEventListener('pointerup', stopResize);
    resizer.addEventListener('pointerdown', startResize);

    return () => {
      container.removeEventListener('pointermove', eventMoveHandler);
      container.removeEventListener('pointerup', stopResize);
      resizer.removeEventListener('pointerdown', startResize);
    };
  }, []);
}
