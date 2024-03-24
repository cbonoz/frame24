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

export const abbreviate = (str: string, maxLength: number): string => {
	if (str.length > maxLength) {
		return str.substring(0, maxLength) + '...';
	}
	return str;
}

export const warpedUrl = (fname: string): string => {
	return `https://warpcast.com/${fname}`
}

export const parseScore = (score?: number): number => {
	return Number(
		parseFloat((score || 0) * 100 + '').toFixed(2)
	);
}

export function jsonToCommaSeparatedStrings(jsonObjects: any[]) {
	if (isEmpty(jsonObjects)) {
		return []
	}
    // Initialize an empty array to store comma-separated strings
    let commaSeparatedStrings: any[] = [];

	let keys = Object.keys(jsonObjects[0]);
	commaSeparatedStrings.push(keys.join(','));
    // Iterate over each JSON object
    jsonObjects.forEach(obj => {
        // Extract keys from the current object
        // Construct the comma-separated string for the current object
        let commaSeparatedString = keys.map(key => obj[key]).join(',');
        // Push the string to the array
        commaSeparatedStrings.push(commaSeparatedString);
    });

    // Return the array of comma-separated strings
    return commaSeparatedStrings;
}

export const printSymbolProportionalTimesRoundingUp = (amount: number, maxAmount: number, symbol: string, maxLength: number): string => {
	const proportionalAmount = Math.ceil(amount / maxAmount * maxLength);
	let result = ''
	for (let i = 0; i < proportionalAmount; i++) {
		result += symbol
	}
	return result
}


