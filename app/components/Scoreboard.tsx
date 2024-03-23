interface Props {
	data: { name: string; score: number }[];
}

function Scoreboard({ data }: Props) {
	return (
		<div className="flex flex-col items-start space-y-2">
			{data.map((item, index) => (
				<div key={index} className="flex items-center">
					<div className="w-20 mr-2">{item.name}</div>
					<div className="relative w-full">
						<div
							className="absolute top-0 left-0 h-6 bg-gradient-to-r from-red-500 to-green-500"
							style={{ width: `${item.score}%` }}
						></div>
						<div className="absolute top-0 right-0 h-full w-6 bg-white border border-gray-300"></div>
					</div>
					<div className="ml-2">{item.score}/100</div>
				</div>
			))}
		</div>
	);
}

export default Scoreboard;
