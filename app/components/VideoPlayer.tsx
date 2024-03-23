import cn from 'classnames';

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
import * as Player from '@livepeer/react/player';
import * as Popover from '@radix-ui/react-popover';
import { Clip, ClipPayload } from 'livepeer/dist/models/components';
import { CheckIcon, ChevronDownIcon, Settings, XIcon } from 'lucide-react';
import React, { useCallback, useTransition } from 'react';
import { DEMO_PLAYBACK_ID } from '../lib/constants';
import { getPlaybackSource } from '../lib/livepeer';
// import { vodSource } from "./source";

// props
interface Props {
	title?: string;
	onClick?: () => void;
	playbackId?: string;
}

export const VideoPlayer = async ({ playbackId = DEMO_PLAYBACK_ID, title, onClick }: Props) => {
	const sourceUrl = await getPlaybackSource(playbackId);
	// console.log('sourceUrl', sourceUrl);

	return (
		<Player.Root src={sourceUrl}>
			<Player.Container>
				<Player.Video title="Live stream" />

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
