import { headers } from 'next/headers';
import { HOME_FRAME } from './constants';
import { FramePage } from '../types';

export function currentURL(pathname: string): URL {
	const headersList = headers();
	const host = headersList.get('x-forwarded-host') || headersList.get('host');
	const protocol = headersList.get('x-forwarded-proto') || 'http';

	return new URL(pathname, `${protocol}://${host}`);
}

export const requireEnv = (value: any, key: string): string => {
	if (!value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
	console.log(`[env] ${key}: ${value.substring(0, 4)}**`);
	return value;
};

export const createFrameUrl = (pathname: string) => {
	return new URL(pathname || HOME_FRAME, process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000');
};

export const isEmpty = (obj: any) => {
	return !obj || obj.length === 0;
};

export const createTargetUrl = (params: any) => {
	// convert params to query string
	const searchParams = new URLSearchParams(params);
	return "?" + searchParams.toString();
}

export const printSymbolProportionalTimesRoundingUp = (amount, maxAmount, symbol, maxLength) => {
	const proportionalAmount = Math.ceil(amount / maxAmount * maxLength);
	let result = ''
	for (let i = 0; i < proportionalAmount; i++) {
		result += symbol
	}
	return result
}


