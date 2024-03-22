import { Src } from '@livepeer/react';
import { PauseIcon, PlayIcon } from "@livepeer/react/assets";
import { getSrc } from "@livepeer/react/external";
import * as Player from "@livepeer/react/player";
// import { vodSource } from "./source";

// props
interface Props {
  src: Src[] | null;
  title?: string;
  onClick?: () => void;
}

export const VideoPlayer = ({ src, title, onClick }: Props) => {
  return (
    <Player.Root src={src}>
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
