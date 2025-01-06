import React from "react";
import { createRoot } from "react-dom/client";

type ContainerType = Element | DocumentFragment;

function legacyRender(node: React.ReactElement, container: ContainerType): void {
	const root = createRoot(container);
	root.render(node);
}

export function render(node: React.ReactElement, container: ContainerType): void {
	legacyRender(node, container);
}

function legacyUnmount(container: ContainerType): void {
	const root = createRoot(container);
	root.unmount();
}

export function unmount(container: ContainerType): void {
	legacyUnmount(container);
}
