import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";

export interface PortalProps {
	getContainer?: () => HTMLElement;
	className?: string;
}

export const Portal: React.FunctionComponent<PropsWithChildren<PortalProps>> = ({ children, getContainer, className = "" }: PropsWithChildren<PortalProps>) => {
	// const ref = useRef<HTMLDivElement>(document.createElement("div"));
	const rootEle = getContainer ? getContainer() : document.body;

	// const initial = (): void => {
	// 	ref.current.classList.add(`ui-portal`);
	// 	if (className) {
	// 		className.split(" ").forEach((c) => ref.current.classList.add(c));
	// 	}
	// 	rootEle.appendChild(ref.current);
	// };

	// const destroy = (): void => {
	// 	rootEle.removeChild(ref.current);
	// };

	// useEffect(() => {
	// 	initial();
	// 	return (): void => {
	// 		destroy();
	// 	};
	// }, []);

	return ReactDOM.createPortal(<div className={`ui-portal ${className}`}>{children}</div>, rootEle);
};
