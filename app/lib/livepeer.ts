import { getSrc } from '@livepeer/react/external';
import axios from 'axios';
import { Livepeer } from 'livepeer';
import { requireEnv } from './utils';
import { CreateStreamResponse } from 'livepeer/dist/models/operations';

const LIVE_PEER_KEY = requireEnv(process.env.LIVEPEER_API_KEY, 'LIVEPEER_API_KEY');

const livepeer = new Livepeer({
	apiKey: LIVE_PEER_KEY,
});

// https://docs.livepeer.org/developers/guides/create-livestream

export const createStreamSdk = async (streamData: { name: string }) => {
	const data: CreateStreamResponse = await livepeer.stream.create(streamData);
	const stream = data
	console.log('stream created:', stream);
	return stream;
};

// curl --request POST \
//   --url https://livepeer.studio/api/stream \
//   --header 'Authorization: Bearer <api-key>' \
//   --header 'Content-Type: application/json' \
//   --data '{
//   "name": "test_stream",
// }'
// convert this to an axios call
export const createStream= async (streamData: { name: string }) => {
	const url = 'https://livepeer.studio/api/stream';
	const headers = {
		Authorization: `Bearer ${LIVE_PEER_KEY}`,
		'Content-Type': 'application/json',
	};
	const response = await axios.post(url, streamData, { headers });
	const stream = response.data;
	console.log('stream created:', stream);
	return stream;
}

export const getStreamUrl = (streamKey: string) => {
	return `https://lvpr.tv/broadcast/${streamKey}`;
}
