import React, { CSSProperties, FunctionComponent, isValidElement, PropsWithChildren, ReactElement } from "react";
import classNames from "classnames";

export type FlexMainType = "right" | "left" | "justify" | "center";
export type FlexCrossType = "top" | "bottom" | "baseline" | "center" | "stretch";
export type FlexBoxType = "mean" | "first" | "last" | "justify";
export type FLexDirType = "top" | "right" | "bottom" | "left";

export interface FlexProps {
	/**
	 * @description 子元素占空余空间比例
	 */
	ratio?: number[];
	/**
	 * @description 主轴对齐方式
	 */
	main?: FlexMainType;
	/**
	 * @description 交叉轴对齐方式
	 */
	cross?: FlexCrossType;
	/**
	 * @description 子元素设置
	 */
	box?: FlexBoxType;
	/**
	 * @description 主轴方向
	 */
	dir?: FLexDirType;
	className?: string;
	style?: CSSProperties;
}

const prefixCls = "ui-flex";

export const Flex: FunctionComponent<PropsWithChildren<FlexProps>> = ({
	cross = "center",
	box = "mean",
	dir = "left",
	ratio,
	main,
	style,
	children,
	className = "",
}: PropsWithChildren<FlexProps>) => {
	const classes = classNames(prefixCls, className, {
		[`${prefixCls}-dir-${dir}`]: dir,
		[`${prefixCls}-box-${box}`]: box && !ratio,
		[`${prefixCls}-main-${main}`]: main,
		[`${prefixCls}-cross-${cross}`]: cross && dir !== "top",
	});

	const renderChildren = (): React.ReactNode => {
		if (!ratio) return children;

		if (Array.isArray(children)) {
			return React.Children.map(children, (child: React.ReactNode, index) => {
				if (!child || !ratio) return;

				if (typeof child === "string" || typeof child === "number") {
					return child;
				}
				if (isValidElement(child)) {
					return React.cloneElement(child as ReactElement, {
						className: `ui-flex-box-${ratio[index]} ${child.props.className || ""}`,
					});
				}
				return null;
			});
		} else {
			return children;
		}
	};

	return (
		<div className={classes} style={style}>
			{renderChildren()}
		</div>
	);
};
