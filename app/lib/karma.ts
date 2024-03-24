import axios from 'axios';
import { isEmpty } from 'livepeer/dist/internal/utils';
import { parseScore } from './utils';

const BASE_URL = 'https://graph.cast.k3l.io';
const axiosInstance = axios.create({
	baseURL: BASE_URL,
});

// https://docs.karma3labs.com/farcaster/ideas-to-build-using-openrank-apis
export const getPersonalizedEngagement = async (fids: string[], limit?: number) => {
	console.log('getPersonalizedEngagement', fids, limit);
	limit = limit || 20;
	let url = `/scores/personalized/engagement/fids?k=2&limit=${limit}`;
	let result;
	try {
		let { data } = await axiosInstance.post(url, fids);
		result = data?.result || [];
		if (isEmpty(result)) {
			throw new Error('No data found');
		}

	} catch (e) {
		// Can add additional fetch schemes in the case of exception or other criteriahere.
		const randomOffset = Math.floor(Math.random() * 100);
		url = `/scores/global/engagement/rankings?limit=${limit}&offset=${randomOffset}`;
		let {data} = await axiosInstance.get(url);
		result = data?.result || [];
	}
	result = result.map((item: any) => ({...item, score: parseScore(item.score)}));
	console.log('result', result[0])
	return result;
};
