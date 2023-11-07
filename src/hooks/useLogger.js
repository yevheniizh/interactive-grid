import { useEffect } from "react";

export const useLogger = (ref) => {
  useEffect(() => {
    const canvas = ref.current;

    const tiles = canvas.querySelectorAll( '.tile' );
    tiles.forEach( (tile) => {
      const log = tile?.querySelector('.log');
      if ( log ) {
        const { top, left } = tile.getBoundingClientRect();
        log.innerHTML = `x: ${left.toFixed()} y: ${top.toFixed()} w: ${tile.offsetWidth} h: ${tile.offsetHeight}`;
      }
    });

    const onMouseMove = (e) => {
      const tile = e.target.closest( '.tile' );
      const log = tile?.querySelector('.log');

      if ( tile && log ) {
        const { top, left } = tile.getBoundingClientRect();
        log.innerHTML = `x: ${left.toFixed()} y: ${top.toFixed()} w: ${tile.offsetWidth} h: ${tile.offsetHeight}`;
      }
    }

    canvas.addEventListener('mousemove', onMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
}
