

export interface UserProfile {
		fname?: string;
		username?: string;
		bio?: string;
		pfp?: string;
		address?: string;
		fid?: number;
		score?: number;
}


export enum FramePage {
	Menu,
	Discover,
	About,
	ViewInfo,
	Top,
	Results,
}