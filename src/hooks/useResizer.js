import { useEffect, useRef } from "react";

export const useResizer = (ref) => {
  const activeRef = useRef(false);
  const drag = useRef({ x: 0, y: 0 });
  const dims = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = ref.current;

    function startResize(e) {
      const tile = e.target.closest( '.tile' );
      const target = tile?.querySelector( '.tile-media-holder' );
      const resizer = e.target.closest( '.tile .resize-handler' );
      
      if ( target && resizer ) {
        resizer.setPointerCapture(e.pointerId); // IMPORTANT!
        activeRef.current = true;
        drag.current = ({ x: e.clientX, y: e.clientY });
        dims.current = ({ w: target.offsetWidth, h: target.offsetHeight });
      }
    };

    function eventMoveHandler(e) {
      const tile = e.target.closest( '.tile' );

      if ( tile ) {
        const [target] = tile.children;
        const active = activeRef.current;
        const { x, y } = drag.current;
        if (active) {
          const xDiff = Math.abs( x - e.clientX );
          const yDiff = Math.abs( y - e.clientY );
          const newW = ( x > e.clientX ) ? ( dims.current.w - xDiff ) : ( dims.current.w + xDiff );
          const newH = ( y > e.clientY ) ? ( dims.current.h - yDiff ) : ( dims.current.h + yDiff );

          tile.style.width = newW + 'px';
          // container.style.height = newH + 'px';

          { // To keep aspect ratio
            tile.style.height = 'auto';
            tile.style.setProperty("aspect-ratio", "1/" + target.naturalHeight / target.naturalWidth);
          }
        }
      }
    }

    function stopResize(e) {
      activeRef.current = false;
    };

    canvas.addEventListener('pointerdown', startResize);
    canvas.addEventListener('pointermove', eventMoveHandler);
    canvas.addEventListener('pointerup', stopResize);

    return () => {
      canvas.removeEventListener('pointerdown', startResize);
      canvas.removeEventListener('pointermove', eventMoveHandler);
      canvas.removeEventListener('pointerup', stopResize);
    };
  }, []);
}
