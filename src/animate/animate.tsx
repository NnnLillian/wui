import React, { FunctionComponent, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
// import { Device } from "../utils";

export type AnimateType = "fade" | "slide-up" | "slide-right" | "slide-left" | "expand-in";

export interface AnimateProps {
	animation?: AnimateType;
	duration?: number;
	show?: boolean;
	children: any;
}

const Animate: FunctionComponent<AnimateProps> = (props: AnimateProps) => {
	const { duration = 200, animation = "fade", show = true, children } = props;
	const [ani, setAni] = useState(false);

	useEffect(() => {
		setAni(!!show);
	}, []);

	useEffect(() => {
		setAni(!!show);
	}, [show]);

	// if (Device.isBadAndroid()) {
	//     return children;
	// }

	return (
		<CSSTransition classNames={animation} in={ani} timeout={duration!} unmountOnExit>
			{children}
		</CSSTransition>
	);
};

const MemoAnimate = React.memo(Animate);
export default MemoAnimate;
