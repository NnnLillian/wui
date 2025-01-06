import React, { FunctionComponent, PropsWithChildren, ReactNode, useEffect } from "react";
import Animate, { AnimateType } from "../animate/index";
import Button, { ButtonProps } from "../button/index";
import Portal from "../portal/index";
import Flex from "../flex/index";
import classNames from "classnames";

export type ModalPlacement = "left" | "top" | "right" | "bottom" | "center" | "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
export type ModalType = "popup" | "drawer" | "custom";
export type ModalSize = "small" | "middle" | "large" | "xl" | "";

export interface ModalProps {
	/**
	 * @description 对话框是否可见
	 */
	open?: boolean;
	/**
	 * @description 位置
	 */
	placement?: ModalPlacement;
	/**
	 * @description 是否显示蒙层
	 */
	mask?: boolean;
	/**
	 * @description 点击蒙层是否允许关闭
	 */
	maskClosable?: boolean;
	/**
	 * @description 是否显示关闭按钮
	 */
	closable?: boolean;
	/**
	 * @description 弹框大小
	 */
	size?: ModalSize;
	/**
	 * @description 标题
	 */
	title?: string;
	/**
	 * @description 是否显示header头
	 */
	header?: boolean;
	/**
	 * @description 确认按钮文案
	 */
	okText?: string;
	/**
	 * @description 确定按钮属性
	 */
	okBtnProps?: ButtonProps;
	/**
	 * @description 取消按钮文案
	 */
	cancelText?: string;
	/**
	 * @description 取消按钮属性
	 */
	cancelBtnProps?: ButtonProps;
	/**
	 * @description 是否展示底部按钮
	 */
	footer?: boolean;
	/**
	 * @description 容器类名
	 */
	className?: string;
	/**
	 * @description 可用于设置浮层的样式，调整浮层位置等
	 */
	style?: React.CSSProperties;
	/**
	 * @description 动画
	 */
	animation?: { duration: number; animation: AnimateType };
	/**
	 * @description Modal所属页面
	 */
	page: string;
	children: React.ReactNode;
	/**
	 * @description 确定按钮回调
	 */
	onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * @description 取消按钮回调
	 */
	onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * @description 关闭按钮回调，有onClose后关闭按钮不触发onCancel
	 */
	onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * @description 弹框关闭后触发回调
	 */
	afterClose?: () => void;
	/**
	 * @description 指定 Modal 挂载的 HTML 节点，默认挂载在当前 body
	 */
	getContainer?: () => HTMLElement;
}

interface ModalCloseProps extends ModalProps {
	onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onCancel?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined extends never
		? (e: React.MouseEvent<HTMLButtonElement>) => void
		: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}

const prefixCls = "ui-modal";
const prefixClsBtn = "ui-modal-btn";

export const Modal: FunctionComponent<PropsWithChildren<ModalCloseProps>> = (props: PropsWithChildren<ModalCloseProps>) => {
	const {
		open,
		title = "",
		mask = true,
		footer = true,
		header = true,
		size = "small",
		className = "",
		okText = "确定",
		cancelText = "取消",
		okBtnProps,
		cancelBtnProps,
		closable = true,
		maskClosable = true,
		placement = "center",
		style,
		page,
		children,
		animation = { duration: 200, animation: "expand-in" },
		afterClose,
		getContainer,
		onOk,
		onCancel,
		onClose,
	} = props;
	const handleOk = (e: React.MouseEvent<HTMLButtonElement>): void => {
		onOk && onOk(e);
	};

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
		onCancel && onCancel(e);
		afterClose?.();
	};

	const handleClose = (e: React.MouseEvent<HTMLButtonElement>): void => {
		onClose ? onClose(e) : onCancel?.(e);
		afterClose?.();
	};

	const renderFooter = (): ReactNode => {
		if ((!cancelText && !okText) || !footer) {
			return null;
		}

		const okClasses = classNames(prefixClsBtn, `${prefixClsBtn}-ok`, {
			[`${prefixClsBtn}-single`]: !okText,
		});

		const cancleClasses = classNames(prefixClsBtn, `${prefixClsBtn}-cancel`, {
			[`${prefixClsBtn}-single`]: !okText,
		});

		return (
			<Flex className={`${prefixCls}-footer`} main="center" ratio={[0, 0]}>
				{cancelText ? (
					<Button className={cancleClasses} block onClick={handleCancel} page={page} clickId={cancelText} {...cancelBtnProps}>
						<div>{cancelText}</div>
					</Button>
				) : null}

				{okText ? (
					<Button className={okClasses} block onClick={handleOk} page={page} clickId={okText} {...okBtnProps}>
						<div>{okText}</div>
					</Button>
				) : null}
			</Flex>
		);
	};

	useEffect(() => {
		if (!open) {
			afterClose?.();
		}
	}, [open]);

	const wrapClasses = classNames(`${prefixCls}-wrap`, {
		[`${prefixCls}-placement-${placement}`]: placement,
		[`${prefixCls}-hidden`]: !open,
		[`${prefixCls}-page-${page}`]: page,
	});

	const maskClasses = classNames(`${prefixCls}-mask`, {
		[`${prefixCls}-mask-visible`]: mask,
	});

	const classes = classNames(prefixCls, className, {
		[`${prefixCls}-size-${size}`]: size,
	});

	return (
		<Portal getContainer={getContainer}>
			<div className="ui-modal-root">
				<div className={wrapClasses}>
					{open ? <Button className={maskClasses} disable={!maskClosable} onClick={handleClose} page={page} clickId={`关闭Modal`} /> : null}

					<Animate {...animation} show={open}>
						<div className={classes} style={style}>
							{closable ? <Button className="ui-modal-close" block onClick={handleClose} page={page} clickId="关闭Modal" /> : null}
							{header ? <div className="ui-modal-header">{title}</div> : null}
							<div className="ui-modal-body">{children}</div>
							{renderFooter()}
						</div>
					</Animate>
				</div>
			</div>
		</Portal>
	);
};
