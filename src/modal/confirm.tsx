import rcUtil from "../utils/rcutil/index";
import { Modal, ModalProps } from "./modal";

export type ModalFunc = (props: ModalProps) => ModalFuncResponse;

export type ModalFuncResponse = {
	destroy: () => void;
};

const DESTROY_CACHES: Array<() => void> = [];

const confirm: ModalFunc = function (config: ModalProps) {
	const container = document.createDocumentFragment();

	let currentConfig = {
		...config,
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		close,
		open: true,
	};

	function render({ open, page, children, ...other }: ModalProps): void {
		setTimeout(() => {
			rcUtil.render(
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				<Modal open={open} maskClosable onCancel={close} page={page} {...other}>
					{children}
				</Modal>,
				container
			);
		});
	}

	function destroy(): void {
		for (let i = 0; i < DESTROY_CACHES.length; i++) {
			const fn = DESTROY_CACHES[i];
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			if (fn === close) {
				DESTROY_CACHES.splice(i, 1);
				break;
			}
		}
		rcUtil.unmount(container);
	}

	function close(): void {
		currentConfig = {
			...currentConfig,
			open: false,
			afterClose: (): void => {
				destroy();
			},
		};

		render(currentConfig);
	}

	render(currentConfig);

	DESTROY_CACHES.push(close);

	return {
		destroy: close,
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
