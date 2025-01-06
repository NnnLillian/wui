import { FunctionComponent, PropsWithChildren, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export interface PortalProps {
	getContainer?: () => HTMLElement;
	className?: string;
}

export const Portal: FunctionComponent<PropsWithChildren<PortalProps>> = ({ children, getContainer, className = "" }: PropsWithChildren<PortalProps>) => {
	// const ref = useRef<HTMLDivElement>(document.createElement("div"));
	const rootEle = getContainer ? getContainer() : document.body;

	const PortalContainer = styled.div`
		position: relative;
	`;

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

	return ReactDOM.createPortal(<PortalContainer className={className}>{children}</PortalContainer>, rootEle);
};
