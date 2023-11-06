import { useEffect } from "react";

export const useLogger = (ref) => {
  useEffect(() => {
    const target = ref.current;
    if (!target) throw new Error("Target element doesn't exist");

    const log = target.querySelector('.log');
    if (!log) throw new Error("Log element doesn't exist");

    log.innerHTML = `x: ${target.offsetLeft} y: ${target.offsetTop} w: ${target.offsetWidth} h: ${target.offsetHeight}`;

    const onMouseMove = (e) => {
      log.innerHTML = `x: ${target.offsetLeft} y: ${target.offsetTop} w: ${target.offsetWidth} h: ${target.offsetHeight}`;
    }

    target.addEventListener('mousemove', onMouseMove);

    return () => {
      target.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
}
