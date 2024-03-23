// [0]   address: '0x4114e33eb831858649ea3702e1c9a2db3f626446',
// [0]   fname: 'varunsrin.eth',
// [0]   username: 'v',
// [0]   fid: 2,
// [0]   score: 0.11475324316494252,
// [0]   pfp: 'https://i.seadn.io/gae/sYAr036bd0bRpj7OX6B-F-MqLGznVkK3--DSneL_BT5GX4NZJ3Zu91PgjpD9-xuVJtHq0qirJfPZeMKrahz8Us2Tj_X8qdNPYC-imqs?w=500&auto=format',

import { UserProfile } from '../types';

// [0]   bio: 'Technowatermelon. Elder Millenial. Building Farcaster. \n\nnf.td/varun'
interface Props {
	profile?: UserProfile;
}

const RenderProfile = ({ profile }: Props) => {
	if (!profile) return null;

	const relevanceScore = (profile.score || 0) * 100;

	return (
		<div tw="flex flex-col align-center justify-center max-w-[400]">
			<div tw="flex font-bold">{profile.username}</div>
			<img src={profile.pfp} alt={profile.username} tw="h-[50] w-[50]" />
			<div tw="flex text-xl">{profile.fname}</div>
			<div tw="flex text-xl">{profile.bio}</div>
			<div tw="flex text-xl">{profile.address}</div>
			<div tw="flex text-xl">{relevanceScore}</div>
		</div>
	);
};

export default RenderProfile;
