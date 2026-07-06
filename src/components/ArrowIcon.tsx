interface ArrowIconProps {
	direction: "left" | "right";
	className?: string;
}

export default function ArrowIcon({
	direction,
	className = "",
}: ArrowIconProps) {
	return (
		<img
			src="/images/arrow-down.svg"
			alt=""
			aria-hidden="true"
			className={`nav-arrow nav-arrow--${direction} ${className}`.trim()}
		/>
	);
}
