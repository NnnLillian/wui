import React, { useEffect, useState } from "react";
import { Modal, ModalProps } from "./modal";
import ReactDOM from "react-dom/client";

export type ModalFunc = (props: ModalProps) => ModalFuncResponse;

export type ModalFuncResponse = {
	destroy: () => void;
};

const DESTROY_CACHES: Array<() => void> = [];

const confirm: ModalFunc = function (config: ModalProps) {
	const container = document.createDocumentFragment();
	const root = ReactDOM.createRoot(container);

	let currentConfig = {
		...config,
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		close,
	};

	function ConfirmComponent() {
		const [open, setOpen] = useState(true);

		useEffect(() => {
			if (!open && config.afterClose) {
				config.afterClose();
			}

			// Unmount the root after the component has been unmounted
			return () => {
				if (!open) {
					root.unmount();
				}
			};
		}, [open]);

		const close = () => {
			setOpen(false);
			destroy();
		};

		DESTROY_CACHES.push(close);

		return (
			<Modal open={open} maskClosable onCancel={close} {...currentConfig}>
				{currentConfig.children}
			</Modal>
		);
	}

	root.render(<ConfirmComponent />);

	function destroy(): void {
		for (let i = 0; i < DESTROY_CACHES.length; i++) {
			const fn = DESTROY_CACHES[i];
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			if (fn === close) {
				DESTROY_CACHES.splice(i, 1);
				break;
			}
		}
		root.unmount();
	}

	return {
		destroy: () => {
			root.unmount();
		},
	};
};
export default confirm;

/**
 * 有弹框关闭栈顶弹框并返回true，没有弹框返回false
 * @returns boolean
 */
export function close(): boolean {
	if (!DESTROY_CACHES.length) {
		return false;
	}
	const last = DESTROY_CACHES.pop();
	last && last();
	return true;
}

export function clear(): void {
	DESTROY_CACHES.map((fn: () => void): void => {
		fn();
	});
}
