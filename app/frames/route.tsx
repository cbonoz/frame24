/* eslint-disable react/jsx-key */
import { createFrames, Button } from 'frames.js/next';
import { VideoPlayer } from '../components/VideoPlayer';
import { getPlaybackSourceUrl } from '../lib/livepeer';
import { DEMO_PLAYBACK_ID } from '../lib/constants';
import Image from 'next/image';
import { createFrameUrl } from '../lib/utils';
import Scoreboard from '../components/Scoreboard';
import { getFrameMessage, getPreviousFrame } from 'frames.js/next/server';

const totalPages = 5;

export const frames = createFrames({
	// basePath: '/frames',
	initialState: {
		pageIndex: 0,
	},
});

const handleRequest = frames(async (ctx) => {
	const { searchParams, message } = ctx;
	const inputText = message?.inputText;
	const pageIndex = Number(searchParams.pageIndex || 0);
	const previousFrame = getPreviousFrame(searchParams);
	const frameMessage = await getFrameMessage(previousFrame.postBody, {
		hubHttpUrl: 'https://hub.freefarcasterhub.com:3281',
		fetchHubContext: true,
	});
	console.log('pageIndex', pageIndex, searchParams, previousFrame, frameMessage);

	// https://picsum.photos/
	const imageUrl = `https://picsum.photos/200/300?random=${pageIndex + 1}`;
	// const importedModule = await import('http://xxx.xxx/XX.js');

	// const srcUrl = await getPlaybackSourceUrl(DEMO_PLAYBACK_ID);
	// console.log('handleRequest', srcUrl);

	const data = [
		{ name: 'Alice', score: 80 },
		{ name: 'Bob', score: 65 },
		{ name: 'Charlie', score: 95 },
	];

	return {
		image: (
			<div tw="flex">
				{/* <Scoreboard data={data} /> */}
				<div tw="flex bg-purple-800 text-white w-full h-full justify-center items-center">
					Rent farcaster storage {inputText}
				</div>
				{/* <div
					style={{
						fontSize: 40,
						color: 'black',
						background: 'white',
						width: '100%',
						height: '100%',
						padding: '50px 200px',
						textAlign: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
					}}
				>
					Error fetching data :(. Please try again later. {inputText}
				</div> */}

				{/* <VideoPlayer src={srcUrl} /> */}
				{/* <video width="320" height="240" controls>
					<source
						src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4#t=0.1"
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video> */}
				{/* <iframe width="300" height="200" src="https://www.youtube.com/watch?v=PCXwpLaQZ7s"></iframe> */}
				{/* <img src={imageUrl} width={300} height={200} alt="hello" /> */}
				{/* <video width={300} height={200} src={'https://www.youtube.com/watch?v=PCXwpLaQZ7s'} /> */}
				{/* <div className="flex">
					This is slide {pageIndex + 1} / {totalPages}
				</div> */}
			</div>
		),
		buttons: [
			<Button
				action="post"
				target={{
					pathname: '/frames',
					query: { pageIndex: (pageIndex - 1) % totalPages },
				}}
			>
				←
			</Button>,
			<Button
				action="post"
				target={{
					pathname: '/frames',
					query: { pageIndex: (pageIndex + 1) % totalPages },
				}}
			>
				→
			</Button>,
		],
		textInput: 'Type something!',
	};
});

export const GET = handleRequest;
export const POST = handleRequest;
