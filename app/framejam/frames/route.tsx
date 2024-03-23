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
import { createTargetUrl } from '../../lib/utils';
import { getPersonalizedEngagement } from '../../lib/karma';
import { getFidUser } from '../../lib/pinata';
import RenderProfile from '../../components/RenderProfile';
import { isEmpty } from 'livepeer/dist/internal/utils';

const frames = createFrames({
	basePath: '/framejam/frames',
	initialState: {
		framePage: FramePage.Menu,
		activeIndex: 0,
		selected: [] as any[],
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
	const activeIndex = Number(ctx.searchParams.activeIndex || ctx.initialState.activeIndex);
	const selected: any[] = ctx.state.selected;

	// const frameMessage = await getFrameMessage(previousFrame.postBody, {
	// 	hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
	// });
	const { message: frameMessage } = ctx;
	console.log('url', ctx.url);
	console.log('message', frameMessage);

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

	// RECEIVE PAGE
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
			let neighbors = [];
			let active: UserProfile = {};
			console.log('discover', requesterFid, activeIndex);
			if (requesterFid) {
				try {
					const { data } = await getPersonalizedEngagement([requesterFid.toString()]);
					const result = data?.result;
					neighbors = result || [];
					active = neighbors[activeIndex];
					if (active.fid) {
						const userData = await getFidUser(active.fid);
						active = { ...active, ...userData };
					}
					console.log('data', active);
				} catch (e) {
					console.error('error:', e);
				}
			}

			const isAdding = ctx.searchParams.add === 'true';
			if (isAdding && active) {
				selected.push(active);
			}
			return {
				image: (
					<Layout title="Discover" profileImage={profileImage} displayName={displayName}>
						<div tw="flex flex-col">
							<div tw="flex text-2xl font-bold">Discover {requesterFid}</div>
							{!isEmpty(active.pfp) && <RenderProfile profile={active} />}
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
						View info
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
				},
			};
		case FramePage.Results:
			return {
				image: (
					<Layout title="Results" profileImage={profileImage} displayName={displayName}>
						<div tw="flex flex-col p-4">
							<div tw="flex font-bold">Jamlist:</div>
							{/* selected */}

							{(selected || []).map((profile: any, i: number) => (
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
					<Button action="post" target={createTargetUrl({ page: FramePage.Chat })}>
						Start chat 📬
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
});
export { handleRequest as GET, handleRequest as POST };
