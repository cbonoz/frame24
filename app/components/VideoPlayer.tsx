import * as Player from '@livepeer/react/player';
import {
	ClipIcon,
	EnterFullscreenIcon,
	ExitFullscreenIcon,
	LoadingIcon,
	MuteIcon,
	PauseIcon,
	PictureInPictureIcon,
	PlayIcon,
	SettingsIcon,
	UnmuteIcon,
} from '@livepeer/react/assets';

export const VideoPlayer = ({ src }: { src: Src[] | null }) => {
	return (
		<Player.Root src={src}>
			<Player.Container>
				<Player.Video title="test" />

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
