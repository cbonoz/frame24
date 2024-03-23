import { APP_LOGO, HEADER_HEIGHT } from '../lib/constants';

interface Props {
	profileImage?: string;
	displayName?: string;
	children: React.ReactNode;
	title?: string;
}

const Layout = ({ title, profileImage, displayName, children }: Props) => {
	return (
		<div tw="w-screen flex-col flex h-screen align-top">
			<div tw="flex w-screen align-top justify-between p-4 border-b-4 border-indigo-500">
				<span tw="flex">
					<img tw="flex" src={APP_LOGO} height={HEADER_HEIGHT} width={240} alt="logo" />
					&nbsp;
					{title && <span tw="font-bold px-4 py-1">{title}</span>}
				</span>
				<span tw="flex">
					<img
						height={HEADER_HEIGHT}
						width={HEADER_HEIGHT}
						src={
							profileImage
								? profileImage
								: 'https://res.cloudinary.com/dvargvav9/image/upload/v1633535688/nextjs-ecommerce/placeholder.jpg'
						}
						tw="flex rounded-full"
						alt={displayName}
					/>
					&nbsp;&nbsp;
					<span tw="font-bold px-2 py-1">{displayName || 'Welcome'}</span>
				</span>
			</div>
			<div tw="w-screen flex flex-col">{children}</div>
		</div>
	);
};

export default Layout;
