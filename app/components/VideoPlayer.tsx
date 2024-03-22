import { Src } from '@livepeer/react';
import { PauseIcon, PlayIcon } from "@livepeer/react/assets";
import { getSrc } from "@livepeer/react/external";
import * as Player from "@livepeer/react/player";
import { DEMO_PLAYBACK_ID } from '../lib/constants';
import { getPlaybackSource } from '../lib/livepeer';
// import { vodSource } from "./source";

// props
interface Props {
  title?: string;
  onClick?: () => void;
  playbackId?: string;
}

export const VideoPlayer = async ({ playbackId=DEMO_PLAYBACK_ID, title, onClick }: Props) => {

  const sourceUrl = await getPlaybackSource(playbackId);


  return (
    <Player.Root src={sourceUrl}>
      <Player.Container>
        <Player.Video title={title} />
        <Player.Controls className="flex items-center justify-center">
          <Player.PlayPauseTrigger className="w-10 h-10">
            <Player.PlayingIndicator asChild matcher={false}>
              <PlayIcon />
            </Player.PlayingIndicator>
            <Player.PlayingIndicator asChild>
              <PauseIcon />
            </Player.PlayingIndicator>
          </Player.PlayPauseTrigger>
        </Player.Controls>
      </Player.Container>
    </Player.Root>
  );
};
