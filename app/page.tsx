import { fetchMetadata } from 'frames.js/next';
import { createFrameUrl } from './lib/utils';

export async function generateMetadata() {
	return {
		title: 'My Page',
		// provide a full URL to your /frames endpoint
		...(await fetchMetadata(createFrameUrl('/menu'))),
	};
}

export default function Page() {
	return <span>My existing page</span>;
}
