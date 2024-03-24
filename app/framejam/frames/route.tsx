/* eslint-disable react/jsx-key */
import { createFrames, Button } from 'frames.js/next';
import { getFrameMessage, getPreviousFrame } from 'frames.js/next/server';
import { farcasterHubContext } from 'frames.js/middleware';
import { DEFAULT_DEBUGGER_HUB_URL } from '../../debug';
import { FramePage, UserProfile } from '../../types';
import Layout from '../../components/Layout';
import {
	APP_ABOUT_ITEMS,
	APP_DESC,
	APP_HOME_IMG,
	APP_LOGO,
	APP_NAME,
	HEADER_HEIGHT,
} from '../../lib/constants';
import { createTargetUrl, printSymbolProportionalTimesRoundingUp } from '../../lib/utils';
import { getPersonalizedEngagement } from '../../lib/karma';
import { getFidUser, trackAddEvent } from '../../lib/pinata';
import RenderProfile from '../../components/RenderProfile';
import { isEmpty } from 'livepeer/dist/internal/utils';
import { getBalances } from '../../lib/airstack';
import { get } from 'http';

const frames = createFrames({
	basePath: '/framejam/frames',
	initialState: {
		framePage: FramePage.Menu,
		activeIndex: 0,
		selected: [] as any[],
		active: {} as any,
	},
	/*   middleware:*/

	middleware: [
		farcasterHubContext({
			hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
		}),
	],
});

const handleRequest = frames(async (ctx) => {
	const framePage = Number(ctx.searchParams.page || ctx.initialState.framePage);
	const activeIndex = Number(ctx.state.activeIndex || ctx.initialState.activeIndex);
	const selected: any[] = ctx.state.selected;

	// const frameMessage = await getFrameMessage(previousFrame.postBody, {
	// 	hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
	// });
	const { message: frameMessage } = ctx;

	console.log('url', ctx.url);
	// console.log('ctx', ctx);

	// untrusted data

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

	async function getFullProfile(activeProfile: UserProfile): Promise<UserProfile> {
		if (activeProfile.fid) {
			const userData = await getFidUser(activeProfile.fid);
			activeProfile = { ...activeProfile, ...userData };
			activeProfile['score'] = (activeProfile['score'] || 0) * 100;
		}
		return activeProfile;
	}

	// Select page.
	let neighbors = [];
	let activeProfile: UserProfile = {};
	try {
		switch (framePage) {
			case FramePage.About:
				return {
					image: (
						<Layout profileImage={profileImage} displayName={displayName}>
							{/* centered */}
							<div tw="flex flex-col align-center items-center text-center justify-center">
								<img tw="flex w-[145] h-[40] my-4" src={APP_LOGO} alt="FrameJam Home Image" />
								<div>About</div>
								{APP_ABOUT_ITEMS.map((item, i) => (
									<div tw="flex my-2 text-xl w-screen px-12" key={i}>
										{item}
									</div>
								))}
							</div>
						</Layout>
					),
					buttons: [
						<Button action="post" target={createTargetUrl({ page: FramePage.Menu })}>
							Back to menu
						</Button>,
					],
				};

			case FramePage.Discover:
				console.log('discover', requesterFid, activeIndex);
				if (requesterFid) {
					try {
						const { data } = await getPersonalizedEngagement([requesterFid.toString()]);
						const result = data?.result;
						neighbors = result || [];

						activeProfile = await getFullProfile(neighbors[activeIndex]);
					} catch (e) {
						console.error('error:', e);
					}
				}

				const isAdding = ctx.searchParams.add === 'true';
				if (isAdding && activeProfile) {
					console.log('adding: ', activeProfile);
					selected.push(activeProfile);
					const untrustedData = { ...frameMessage };
					delete untrustedData.state;
					// take hash of framemessage
					const trustedData = { messageBytes: '' };
					await trackAddEvent({ untrustedData, trustedData }, activeProfile.fid + '');
				}

				const title = `Discover ${activeIndex + 1}/${neighbors.length} profiles`;
				return {
					image: (
						<Layout title={title} profileImage={profileImage} displayName={displayName}>
							<div tw="flex bg-indigo-500 text-white w-full pt-8 pb-16 justify-center">
								{/* <div tw="flex text-2xl font-bold">Discover {requesterFid}</div> */}
								{!isEmpty(activeProfile.pfp) && <RenderProfile profile={activeProfile} />}
								{isEmpty(activeProfile.pfp) && (
									<div tw="flex text-2xl font-bold">
										No more profiles found. Come back later for more results!
									</div>
								)}
								<div tw="flex">Added profiles: {selected.length}</div>
							</div>
						</Layout>
					),
					buttons: [
						<Button
							action="post"
							target={createTargetUrl({
								page: FramePage.Discover,
								add: true,
							})}
						>
							Yay ⬆️
						</Button>,
						<Button
							action="post"
							target={createTargetUrl({
								page: FramePage.Discover,
								add: false,
							})}
						>
							Nay ⬇️
						</Button>,
						<Button action="post" target={createTargetUrl({ page: FramePage.ViewInfo })}>
							View holdings
						</Button>,
						<Button action="post" target={createTargetUrl({ page: FramePage.Results })}>
							Done 🎉
						</Button>,
						// add done
					],
					state: {
						...ctx.state,
						selected,
						activeIndex: activeIndex + 1,
						active: activeProfile,
					},
				};

			case FramePage.ViewInfo:
				let fid = ctx.state.active?.fid;
				if (!fid) {
					const { data } = await getPersonalizedEngagement([requesterFid as any]);
					const result = data?.result;
					neighbors = result || [];
					activeProfile = await getFullProfile(neighbors[activeIndex]);
					fid = activeProfile.fid;
				}

				let { data: holdings } = await getBalances(fid);
				// sorted desc by amount
				holdings = (holdings || []).sort((a: any, b: any) => b.amount - a.amount);

				const amounts = (holdings as any).map((x: any) => x.amount);
				const maxAmount = Math.max(...amounts);

				return {
					image: (
						<Layout title="Holdings" profileImage={profileImage} displayName={displayName}>
							<div tw="flex flex-col p-4">
								<div tw="flex">{activeProfile.username}'s holdings:</div>
								<div tw="flex flex-col text-xl">
									{(holdings as any).map((holding: any, i: number) => (
										<div tw="flex flex-col" key={i}>
											{holding.name} {holding.amount}{' '}
											{printSymbolProportionalTimesRoundingUp(holding.amount, maxAmount, '🍯', 20)}
										</div>
									))}
								</div>
							</div>
						</Layout>
					),
					buttons: [
						<Button action="post" target={createTargetUrl({ page: FramePage.Discover })}>
							Back
						</Button>,
					],
				};
			case FramePage.Results:
				const orderedSelected = selected.sort((a, b) => b.score - a.score);
				return {
					image: (
						<Layout title="Results" profileImage={profileImage} displayName={displayName}>
							<div tw="flex flex-col p-4">
								<div tw="flex font-bold">Jamlist:</div>
								{/* selected */}

								{(orderedSelected || []).map((profile: any, i: number) => (
									<span tw="flex" key={i}>
										<img
											src={profile.pfp}
											alt={profile.username}
											width={HEADER_HEIGHT}
											height={HEADER_HEIGHT}
										/>
										<span tw="px-2">
											{profile.username} - Match {profile.score}% 🍯
										</span>
									</span>
								))}

								<div tw="flex">Use the actions below or return to menu</div>
							</div>
						</Layout>
					),
					buttons: [
						<Button
							action="post"
							target={createTargetUrl({
								page: FramePage.Discover,
								add: true,
							})}
						>
							Save list 📝
						</Button>,
						<Button action="post" target={createTargetUrl({ page: FramePage.Stream })}>
							Share video 🎥
						</Button>,
						<Button action="post" target={createTargetUrl({ page: FramePage.Menu })}>
							Back to menu 🏠
						</Button>,
					],
					textInput: 'Enter a message',
				};
			default:
				return {
					image: (
						<Layout profileImage={profileImage} displayName={displayName}>
							<div tw="flex w-fit	h-fit">
								<img tw="flex w-full h-full" src={APP_HOME_IMG} alt="FrameJam Home Image" />
							</div>
						</Layout>
					),
					buttons: [
						<Button action="post" target={createTargetUrl({ page: FramePage.Discover })}>
							Discover
						</Button>,
						<Button action="post" target={createTargetUrl({ page: FramePage.Top })}>
							Top
						</Button>,
						<Button action="post" target={createTargetUrl({ page: FramePage.About })}>
							About
						</Button>,
					],
				};
		}
	} catch (e) {
		console.error('error:', e);
		const errorMessage = e.message || JSON.stringify(e);
		const text = `${errorMessage} 🤯`;
		return {
			image: (
				<Layout profileImage={profileImage} displayName={displayName}>
					<div tw="flex flex-col w-full h-full justify-center items-center">
						<img tw="flex w-[80] h-[20]" src={APP_LOGO} alt="FrameJam Home Image" />
						<div tw="flex text-2xl">Woah an error occurred. Here it is:</div>
						<br />
						<div tw="flex  py-2 text-xl font-bold text-red-500">{text}</div>
					</div>
				</Layout>
			),
			buttons: [
				<Button action="post" target={createTargetUrl({ page: FramePage.Menu })}>
					Back to menu
				</Button>,
			],
		};
	}
});
export { handleRequest as GET, handleRequest as POST };
