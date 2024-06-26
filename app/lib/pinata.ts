import { PinataFDK } from 'pinata-fdk';
import { requireEnv } from './utils';
import { APP_NAME } from './constants';
const credentials = {
	pinata_jwt: requireEnv(process.env.PINATA_JWT, 'PINATA_JWT'),
	pinata_gateway: requireEnv(process.env.PINATA_GATEWAY, 'PINATA_GATEWAY'),
}
const fdk = new PinataFDK(credentials);

export const getFidUser = async (fid: number) => {
	const userData = await fdk.getUserByFid(fid);

	return userData;
};

export const trackAddEvent = async (data: any, fid: string) => {
	const body = {
		"custom_id": fid,
		"frame_id": APP_NAME,
		data,
	}
	console.log('trackAddEvent', body)//, credentials)
	const options = {
		method: 'POST',
		headers: {Authorization: 'Bearer ' + credentials.pinata_jwt, 'Content-Type': 'application/json'},
		body: JSON.stringify(body)
	  };
	  
	  return fetch('https://api.pinata.cloud/farcaster/frames/interactions', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
}


const sendAnalytics = async (frameData: any, customId: string, frameId?: string) => {
	if (!frameId) {
		frameId = APP_NAME
	}

	return await fdk.sendAnalytics(frameId, frameData, customId);
}