import { PinataFDK } from 'pinata-fdk';
import { requireEnv } from './utils';
const fdk = new PinataFDK({
	pinata_jwt: requireEnv(process.env.PINATA_JWT, 'PINATA_JWT'),
	pinata_gateway: requireEnv(process.env.PINATA_GATEWAY, 'PINATA_GATEWAY'),
});

export const getFidUser = async (fid: number) => {
	const userData = await fdk.getUserByFid(fid);

	return userData;
};
