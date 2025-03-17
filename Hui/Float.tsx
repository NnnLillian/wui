import { Z } from "./Z";
import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useHover,
	useFocus,
	useRole,
	useClick,
	useTransitionStyles,
	useInteractions,
	FloatingFocusManager,
	safePolygon,
	FloatingContext,
	Placement,
} from "@floating-ui/react";
import classNames from "classnames";
import { createContext, CSSProperties, ReactNode, useContext, useState } from "react";

interface ContextType {
	open: boolean;
	floatingContext: FloatingContext;
	styles: CSSProperties;
	floatingProps: Record<string, unknown>;
	width?: string;
}

const FloatContext = createContext<ContextType | null>(null);

interface FloatContentProps {
	children: ReactNode;
}

export const FloatContent = ({ children }: FloatContentProps) => {
	const { open, floatingContext, styles, floatingProps, width } = useContext(FloatContext)!;
	if (!open) return null;
	return (
		<FloatingFocusManager context={floatingContext} modal={false} returnFocus={false} restoreFocus={true}>
			<div ref={floatingContext.refs.setFloating} className={Z.TOOLTIP + " pointer-events-auto"} style={{ ...styles, width }} {...floatingProps}>
				<div
					className={classNames(
						"rounded-lg bg-white shadow-[0px_0px_2px_1px_rgba(0,0,0,0.1)] shadow-[2px_2px_6px_1px_rgba(0,0,0,0.1)] outline outline-1 outline-gray-50",
						width && `w-[${width}]`
					)}
				>
					{children}
				</div>
			</div>
		</FloatingFocusManager>
	);
};

interface BaseFloatProps {
	children: ReactNode;
	placement?: Placement;
	width?: string;
	trigger?: "hover" | "click" | "focus";
}

interface ControlledFloatProps extends BaseFloatProps {
	open: boolean;
	onOpenChange: (isOpen: boolean) => void;
}

interface UncontrolledFloatProps extends BaseFloatProps {
	open?: never;
	onOpenChange?: never;
}

type FloatProps = ControlledFloatProps | UncontrolledFloatProps;

export const Float = ({ children, placement = "right", width, trigger = "hover", open: controlledOpen, onOpenChange }: FloatProps) => {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : uncontrolledOpen;

	const handleOpenChange = (isOpen: boolean) => {
		if (!isControlled) setUncontrolledOpen(isOpen);
		onOpenChange?.(isOpen);
	};

	const { refs, floatingStyles, context } = useFloating({
		placement,
		open,
		onOpenChange: handleOpenChange,
		middleware: [offset(0), flip(), shift()],
		whileElementsMounted: autoUpdate,
	});

	const hover = useHover(context, {
		move: true,
		restMs: 200,
		delay: {
			open: 100,
			close: 100,
		},
		handleClose: safePolygon(),
		enabled: trigger === "hover",
	});
	const focus = useFocus(context, {
		enabled: trigger === "focus",
	});
	const click = useClick(context, {
		enabled: trigger === "click",
	});
	const role = useRole(context, { role: "dialog" });

	const { isMounted, styles: transitionStyles } = useTransitionStyles(context);
	const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, click, role]);

	return (
		<FloatContext.Provider
			value={{
				open: isMounted,
				floatingContext: context,
				styles: { ...floatingStyles, ...transitionStyles },
				floatingProps: getFloatingProps(),
				width,
			}}
		>
			<div ref={refs.setReference} {...getReferenceProps()}>
				{children}
			</div>
		</FloatContext.Provider>
	);
};
