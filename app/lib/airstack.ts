import {
	getFarcasterUserDetails,
	FarcasterUserDetailsInput,
	FarcasterUserDetailsOutput,
} from '@airstack/frames';

import { init } from '@airstack/frames';
import { requireEnv } from './utils';

const airstackKey = requireEnv(process.env.AIRSTACK_API_KEY, 'AIRSTACK_API_KEY');

init(airstackKey);

export const getFarcasterUser = async (fid: number) => {
	const input: FarcasterUserDetailsInput = {
		fid,
	};
	const { data, error }: FarcasterUserDetailsOutput = await getFarcasterUserDetails(input);

	if (error) throw new Error(error);

	console.log('get user data:', data);
	return data;
};
