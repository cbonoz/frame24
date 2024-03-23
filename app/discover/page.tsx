import {
	FrameButton,
	FrameContainer,
	FrameImage,
	FrameInput,
	FrameReducer,
	NextServerPageProps,
	getFrameMessage,
	getPreviousFrame,
	useFramesReducer,
} from 'frames.js/next/server';
import { currentURL, isEmpty } from '../lib/utils';
import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from '../debug';
import HeaderRow from '../components/Layout';
import { APP_NAME, HEADER_HEIGHT } from '../lib/constants';
import { getPersonalizedEngagement } from '../lib/karma';
import Layout from '../components/Layout';
import { getFidUser } from '../lib/pinata';
import RenderProfile from '../components/RenderProfile';
import { UserProfile } from '../types';

type State = {
	done: boolean;
	neighbors: any[];
	selected: any[];
	activeIndex: number;
};

const initialState: State = {
	activeIndex: 0,
	done: false,
	neighbors: [],
	selected: [],
};

const reducer: FrameReducer<State> = (state, action) => {
	const buttonIndex = String(action.postBody?.untrustedData.buttonIndex);
	// input text
	const inputText = action.postBody?.untrustedData.inputText;
	let activeIndex = state.activeIndex;
	let done = state.done;
	switch (buttonIndex) {
	}

	if (!done) {
		switch (buttonIndex) {
			case '1':
				activeIndex++;
				break;
			case '2':
				activeIndex++;
				break;
			case '4':
				done = true;
				break;
		}
	}
	if (done) {
		switch (buttonIndex) {
			case '1':
				// save list
				break;
			case '2':
				// start chat
				break;
		}
	}

	const newState = {
		activeIndex,
		done,
	};
	console.log('update state', newState, 'buttonIndex', buttonIndex, inputText);
	return { ...state, ...newState };
};

// This is a react server component only
export default async function Discover({ params, searchParams }: NextServerPageProps) {
	const url = currentURL('/discover');
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

	let neighbors = [];
	let active: UserProfile = {};
	if (requesterFid) {
		try {
			const { data } = await getPersonalizedEngagement([requesterFid.toString()]);
			const result = data?.result;
			neighbors = result || [];
			active = neighbors[state.activeIndex];
			if (active.fid) {
				const userData = await getFidUser(active.fid);
				active = { ...active, ...userData };
			}
			console.log('data', active);
		} catch (e) {
			console.error('error:', e);
		}
	}

	let Body: React.ReactNode;
	if (!state.done) {
		Body = (
			<div tw="flex">
				<div tw="flex text-2xl font-bold">Discover {requesterFid}</div>
				{!isEmpty(active.pfp) && <RenderProfile profile={active} />}
			</div>
		);
	} else {
		Body = (
			<div tw="flex">
				<div tw="flex flex-col p-4">
					<div tw="flex font-bold">Jamlist:</div>
					{/* selected */}

					{state.selected.map((profile, i) => (
						<span tw="flex" key={i}>
							<img
								src={profile.pfp}
								alt={profile.username}
								width={HEADER_HEIGHT}
								height={HEADER_HEIGHT}
							/>
						</span>
					))}

					<div tw="flex">Use the actions below or return to menu</div>
				</div>
			</div>
		);
	}

	// Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
	// example: load the users credentials & check they have an NFT
	// console.log('info: state is:', state, frameMessage);

	const title = state.done ? 'Results' : 'Discover';

	return (
		<div>
			{' '}
			<FrameContainer
				pathname="/discover"
				postUrl="/discover/frames"
				state={state}
				previousFrame={previousFrame}
			>
				<FrameImage>
					<Layout title={title} profileImage={profileImage} displayName={displayName}>
						{Body}
					</Layout>
				</FrameImage>
				{!state.done ? <FrameButton target={`/discover/frames?add=true`}>Yay ↑</FrameButton> : null}
				{!state.done ? (
					<FrameButton target={`/discover/frames?add=false`}>Nay ↑</FrameButton>
				) : null}
				{!state.done ? <FrameButton>View info❓</FrameButton> : null}
				{!state.done ? <FrameButton>Done ✅</FrameButton> : null}
				{state.done ? <FrameButton>Save list</FrameButton> : null}
				{state.done ? <FrameButton>Start chat 📞</FrameButton> : null}
				{state.done ? (
					<FrameButton target="/framejam?completed=true">Back to menu 🔄</FrameButton>
				) : null}
				{state.done ? <FrameInput text="Enter message for chat room" /> : null}
			</FrameContainer>
		</div>
	);
}
