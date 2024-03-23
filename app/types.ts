

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
	Stream,
	Top,
	Results,
}

[
	{
	  "blockchain": "ethereum",
	  "tokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
	  "amount": 125,
	  "amountInWei": "125000000",
	  "name": "USD Coin",
	  "symbol": "USDC"
	}
  ]
export interface Holding {
	amount: number;
	amountInWei: string;
	name: string;
	symbol: string;
	tokenAddress: string;
	blockchain: string;
}