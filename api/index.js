
import { getSrc } from "@livepeer/react/external";


export const getPlaybackSource = async (playbackId) => {
  const playbackInfo = await livepeer.playback.get(playbackId);

  const src = getSrc(playbackInfo.playbackInfo);

  return src;
};
