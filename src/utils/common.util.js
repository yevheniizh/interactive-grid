const videoRegExp = new RegExp(/https?:\/\/.*\.(?:mp4)/i);
export const isVideoUrl = (url) => videoRegExp.test(url);
