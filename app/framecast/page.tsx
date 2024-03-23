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
import { currentURL } from '../lib/utils';
import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from './../debug';

type State = {
	searchUsers: boolean;
	searchTokens: boolean;
	neighbors: any[];
	selected: any;
};

const initialState: State = { started: false, neighbors: [], selected: null };

const reducer: FrameReducer<State> = (state, action) => {
	const buttonIndex = action.postBody?.untrustedData.buttonIndex;
	return {
		...state,
		started: true,
	};
};

// This is a react server component only
export default async function Home({ params, searchParams }: NextServerPageProps) {
	const url = currentURL('/framecast');
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

	if (inputText && state.searchUsers) {
		await getNeigh;
	}

	const isHome = !state.searchUsers && !state.searchTokens;

	// Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
	// example: load the users credentials & check they have an NFT
	console.log('info: state is:', state, frameMessage);

	// then, when done, return next frame
	return (
		<div>
			GM user data example. <Link href={createDebugUrl(url)}>Debug</Link>
			<FrameContainer
				pathname="/framecast"
				postUrl="/framecast/frames"
				state={state}
				previousFrame={previousFrame}
			>
				<FrameImage>
					<HeaderRow profileImage={profileImage} displayName={displayName} />
				</FrameImage>
				<FrameButton>Discover Users</FrameButton>
				<FrameButton>Discover Users</FrameButton>
			</FrameContainer>
		</div>
	);
}
