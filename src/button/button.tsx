import React, { CSSProperties, PropsWithChildren } from "react";
import classNames from "classnames";

export type ButtonType = "next" | "submit" | "cancel" | "confirm" | "primary";
export type ButtonSize = "small" | "middle" | "large" | "extra-large" | "extra-small";

export interface ButtonProps {
	/**
	 * @description 禁止点击
	 */
	disable?: boolean;
	/**
	 * @description 常用按钮样式
	 */
	type?: ButtonType;
	/**
	 * @description 按钮大小
	 */
	size?: ButtonSize;
	/**
	 * @description 是否有边框
	 */
	border?: boolean;
	/**
	 * @description 宽度为父元素宽度
	 */
	block?: boolean;
	/**
	 * @description 点击事件
	 */
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * @description 页面名称
	 */
	page?: string;
	/**
	 * @description 埋点标识
	 */
	clickId?: string;
	/**
	 * @description 埋点数据
	 */
	log?: any;
	/**
	 * @description 是否加载中
	 */
	loading?: boolean;
	/* 以下为其它参数传过来的参数（没有实际用途） */
	style?: CSSProperties;
	className?: string;
}

const prefixCls = "ui-btn";

export const Button = React.forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>((props, ref) => {
	const { disable = false, className = "", border = false, type = "primary", size = "small", block = false, style, loading, onClick, children } = props;

	const handleClick = React.useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
			e.stopPropagation();

			if (disable || loading) {
				e.preventDefault();
				return;
			}
			onClick?.(e);
		},
		[onClick, loading]
	);

	const classes = classNames(prefixCls, className, {
		[`${prefixCls}-${type}`]: type,
		[`${prefixCls}-${size}`]: size,
		[`${prefixCls}-block`]: block,
		[`${prefixCls}-border`]: border,
		[`${prefixCls}-disable`]: disable,
	});

	return (
		<button ref={ref} style={style} onClick={handleClick} className={classes}>
			{children}
		</button>
	);
});
