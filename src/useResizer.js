import { useEffect, useRef } from "react";

function useResizer(ref) {
  const drag = useRef({ x: "", y: "", active: false });
  const dims = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const container = ref.current;
    if (!container) throw new Error("Element with given id doesn't exist");

    const [target, resizer] = container.children;
    if (!target) throw new Error("Target element must have a parent");
    if (!resizer) throw new Error("Resizer element must have a parent");

    const box = target; // temp
    const boxWrapper = container; // temp
  
    // *****

    function eventMoveHandler(e) {
      const { active, x, y } = drag.current;
      if (active) {
        const xDiff = Math.abs( x - e.clientX );
        const yDiff = Math.abs( y - e.clientY );
        const newW = ( x > e.clientX ) ? ( dims.current.w - xDiff ) : ( dims.current.w + xDiff );
        const newH = ( y > e.clientY ) ? ( dims.current.h - yDiff ) : ( dims.current.h + yDiff );

        boxWrapper.style.width = newW + 'px';
        // boxWrapper.style.height = newH + 'px';

        { // Keep aspect ratio 
          boxWrapper.style.height = 'auto'; // 
          boxWrapper.style.setProperty("aspect-ratio", "1/" + box.naturalHeight / box.naturalWidth);
        }
      }
    }

    function startResize(e) {
      resizer.setPointerCapture(e.pointerId);
      drag.current = ({ ...drag.current, active: true, x: e.clientX, y: e.clientY });
      dims.current = ({ w: box.offsetWidth, h: box.offsetHeight });
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

export default useResizer;