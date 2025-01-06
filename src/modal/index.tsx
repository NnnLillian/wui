import { FunctionComponent } from "react";
import { Modal as UIModal, ModalProps } from "./modal";
import confirm, { clear, close, ModalFunc, ModalFuncResponse } from "./confirm";

type ModalType = typeof UIModal & {
  popup: ModalFunc;
  drawer: ModalFunc;
  custom: ModalFunc;
  horizontal: ModalFunc;
  pc: ModalFunc;
  /**
   * 有弹框关闭栈顶弹框并返回true，没有弹框返回false
   * @returns boolean
   */
  close: () => boolean;
  /**
   * 关闭全部弹框
   * @returns void
   */
  clear: () => void;
  DrawerModal: FunctionComponent<ModalProps>;
  PopupModal: FunctionComponent<ModalProps>;
  HorizontalModal: FunctionComponent<ModalProps>;
  PcModal: FunctionComponent<ModalProps>;
};

const Modal = UIModal as ModalType;

const popup: ModalFunc = function (props: ModalProps) {
  return confirm({
    ...props,
    open: true,
    placement: "center",
    size: "small",
  });
};
const drawer: ModalFunc = function (props: ModalProps) {
  return confirm({
    ...props,
    open: true,
    animation: { duration: 200, animation: "slide-up" },
    placement: "bottom",
  });
};
const custom: ModalFunc = function (props: ModalProps) {
  return confirm(props);
};
const horizontal: ModalFunc = function (props: ModalProps) {
  return confirm({
    closable: false,
    size: "small",
    ...props,
    open: true,
    placement: "center",
    className: `ui-modal-horizontal ${props.className || ""}`,
  });
};
const pc: ModalFunc = function (props: ModalProps) {
  return confirm({
    closable: false,
    size: "small",
    ...props,
    open: true,
    placement: "center",
    className: `ui-modal-pc ${props.className || ""}`,
  });
};

Modal.popup = popup;
Modal.drawer = drawer;
Modal.custom = custom;
Modal.horizontal = horizontal;
Modal.pc = pc;

export const DrawerModal = (props: ModalProps) => {
  return (
    <Modal {...props} placement="bottom" animation={{ animation: "slide-up", duration: 200 }}>
      {props.children}
    </Modal>
  );
};
export const PopupModal = (props: ModalProps) => {
  return (
    <Modal {...props} placement="center" size="small">
      {props.children}
    </Modal>
  );
};
export const HorizontalModal = (props: ModalProps) => {
  return (
    <Modal {...props} className={`ui-modal-horizontal ${props.className || ""}`} placement="center">
      {props.children}
    </Modal>
  );
};
export const PcModal = (props: ModalProps) => {
  return (
    <Modal {...props} className={`ui-modal-pc ${props.className || ""}`} placement="center">
      {props.children}
    </Modal>
  );
};
Modal.DrawerModal = DrawerModal;
Modal.PopupModal = PopupModal;
Modal.HorizontalModal = HorizontalModal;
Modal.PcModal = PcModal;
Modal.close = close;
Modal.clear = clear;

export type { ModalProps, ModalFuncResponse };
export default Modal;
