
import { getSrc } from "@livepeer/react/external";
import { Livepeer}  from "livepeer";
import { requireEnv } from "./utils";

const LIVE_PEER_KEY = requireEnv(process.env.LIVEPEER_API_KEY, "LIVEPEER_API_KEY");

const livepeer = new Livepeer({
  apiKey: LIVE_PEER_KEY
});

export const getPlaybackSource = async (playbackId: string) => {
  const playbackInfo = await livepeer.playback.get(playbackId);

  const src = getSrc(playbackInfo.playbackInfo);

  return src;
};
