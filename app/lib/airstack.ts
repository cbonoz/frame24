import {
	getFarcasterUserDetails,
	FarcasterUserDetailsInput,
	FarcasterUserDetailsOutput,
	getFarcasterUserERC20Balances,
	FarcasterUserERC20BalancesOutput,
} from '@airstack/frames';

import { init } from '@airstack/frames';
import { requireEnv } from './utils';
import { Holding } from '../types';

const airstackKey = requireEnv(process.env.AIRSTACK_API_KEY, 'AIRSTACK_API_KEY');

init(airstackKey);

// https://github.com/Airstack-xyz/airstack-frames-sdk?tab=readme-ov-file#getfarcasteruserdetails
export const getFarcasterUser = async (fid: number) => {
	const input: FarcasterUserDetailsInput = {
		fid,
	};
	const { data, error }: FarcasterUserDetailsOutput = await getFarcasterUserDetails(input);

	if (error) throw new Error(error);

	console.log('get user data:', data);
	return data;
}

export const getBalances = (fid: number): Promise<FarcasterUserERC20BalancesOutput> => {
const input = {
	fid,
	limit: 100,
  };

  return getFarcasterUserERC20Balances(input);
}
