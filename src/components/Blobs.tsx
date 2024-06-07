interface IBlobProps {
	size: number;
	color: string;
	top?: string;
	bottom?: string;
	left?: string;
	right?: string;
}

export const Blob = ({
	size,
	color,
	top = "auto",
	bottom = "auto",
	left = "auto",
	right = "auto",
}: IBlobProps) => (
	<div
		className="absolute blur-[75px] opacity-15 rounded-full pointer-events-none"
		style={{
			width: `${size}px`,
			height: `${size}px`,
			backgroundColor: color,
			top,
			bottom,
			left,
			right,
		}}
	></div>
);

export const Blobs = () => (
	<div className="fixed w-screen h-screen overflow-hidden pointer-events-none">
		<Blob size={500} color="purple" right="-200px"></Blob>
		<Blob size={500} color="cyan" top="100px" left="-300px" />
	</div>
);
