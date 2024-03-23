import { PinataFDK } from 'pinata-fdk';
import { requireEnv } from './utils';
import { APP_NAME } from './constants';

const fdk = new PinataFDK({
	pinata_jwt: requireEnv(process.env.PINATA_JWT, 'PINATA_JWT'),
	pinata_gateway: requireEnv(process.env.PINATA_GATEWAY, 'PINATA_GATEWAY'),
});

export const getFidUser = async (fid: number) => {
	const userData = await fdk.getUserByFid(fid);

	return userData;
};

export const trackAddEvent = (frameData: any, fid: string) => {
	return sendAnalytics(frameData, fid)
}


export const sendAnalytics = async (frameData: any, customId: string, frameId?: string) => {
	if (!frameId) {
		frameId = APP_NAME
	}

	return await fdk.sendAnalytics(frameId, frameData, customId);
}