import {
	FrameButton,
	FrameContainer,
	FrameImage,
	FrameReducer,
	NextServerPageProps,
	getFrameMessage,
	getPreviousFrame,
	useFramesReducer,
} from 'frames.js/next/server';
import Link from 'next/link';
import { createFrameUrl, currentURL } from '../lib/utils';
import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from '../debug';
import { APP_DESC, APP_NAME, HOME_FRAME } from '../lib/constants';
import HeaderRow from '../components/Layout';
import Layout from '../components/Layout';

type State = {
	done: boolean;
	neighbors: any[];
	selected: any;
};

const initialState: State = { done: false, neighbors: [], selected: null };

const reducer: FrameReducer<State> = (state, action) => {
	const buttonIndex = action.postBody?.untrustedData.buttonIndex;

	return {
		...state,
		started: true,
	};
};

// This is a react server component only
export default async function Home({ params, searchParams }: NextServerPageProps) {
	const url = currentURL('/framejam');
	const previousFrame = getPreviousFrame<State>(searchParams);

	const frameMessage = await getFrameMessage(previousFrame.postBody, {
		hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
	});

	const {
		isValid,
		buttonIndex,
		inputText,
		castId,
		requesterFid,
		casterFollowsRequester,
		requesterFollowsCaster,
		likedCast,
		recastedCast,
		requesterVerifiedAddresses,
		requesterUserData,
	} = frameMessage || {};

	const { profileImage, displayName, bio } = requesterUserData || {};

	if (frameMessage && !isValid) {
		throw new Error('Invalid frame payload');
	}
	const [state, dispatch] = useFramesReducer<State>(reducer, initialState, previousFrame);

	// Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
	// example: load the users credentials & check they have an NFT
	console.log('info: state is:', state, frameMessage);

	// then, when done, return next frame
	return (
		<div>
			GM user data example. <Link href={createDebugUrl(url)}>Debug</Link>
			<FrameContainer
				pathname={HOME_FRAME}
				postUrl="/framejam/frames"
				state={state}
				previousFrame={previousFrame}
			>
				<FrameImage>
					<Layout profileImage={profileImage} displayName={displayName}>
						<div tw="flex text-xl">{APP_NAME}</div>
						<div tw="flex text-2xl font-bold">{APP_DESC}</div>
					</Layout>
				</FrameImage>
				{/* search params in url */}
				<FrameButton action="post_redirect" target={createFrameUrl('/discover').toString()}>
					Discover
				</FrameButton>
				<FrameButton>Top</FrameButton>
				<FrameButton>About</FrameButton>
			</FrameContainer>
		</div>
	);
}
