/**
 * @description Eather display or hide the media element depending on if it's loaded or not
 */ 
export const useHandleMediaOnReady = (ref) => {
  const onLoad = () => {
    if (ref.current?.classList.contains('unmounted')) {
      ref.current?.classList.remove('unmounted');
    }
  };

  const onError = () => {
    if (!ref.current?.classList.contains('unmounted')) {
      ref.current?.classList.add('unmounted');
    }
  };

  return ({ onLoad, onError });
};
