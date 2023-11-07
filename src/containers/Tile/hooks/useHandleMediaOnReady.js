import { useEffect } from "react";

export const useImgLoaded = (ref) => {
  const onLoad = () => {
    if (ref.current?.classList.contains('unmounted')) {
      ref.current?.classList.remove('unmounted');
    }
    ref.current.parentElement.parentElement.parentElement.style.setProperty("aspect-ratio", "1/" + ref.current?.naturalHeight / ref.current?.naturalWidth);
  };

  const onError = () => {
    if (!ref.current?.classList.contains('unmounted')) {
      ref.current?.classList.add('unmounted');
    }
  };

  return ({ onLoad, onError });
};

export const useVideoLoaded = (ref) => {
  useEffect(() => {
    ref.current.addEventListener('loadedmetadata', function handleLoadedMetadata(){
      ref.current.parentElement.parentElement.parentElement.style.setProperty("aspect-ratio", "1/" + ref.current?.videoHeight / ref.current?.videoWidth);
      ref.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
    });
  }, []);
};
