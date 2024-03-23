import axios from 'axios';

const BASE_URL = 'https://graph.cast.k3l.io';
const axiosInstance = axios.create({
	baseURL: BASE_URL,
});

// https://docs.karma3labs.com/farcaster/ideas-to-build-using-openrank-apis
export const getPersonalizedEngagement = async (fids: string[], limit?: number) => {
	const url = `/scores/personalized/engagement/fids?k=2&limit=${limit || 5}`;
	return axiosInstance.post(url, fids);
};
