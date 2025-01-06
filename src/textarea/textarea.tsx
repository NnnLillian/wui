import React, { ChangeEvent, ClipboardEvent, CSSProperties, useEffect, useState } from "react";

export interface TextareaProps {
	rows?: number;
	value?: string;
	maxLength?: number;
	showCount?: boolean;
	className?: string;
	placeholder?: string;
	style?: CSSProperties;
	onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement> | ClipboardEvent<HTMLTextAreaElement>) => void;
	onFocus?: () => void;
	onBlur?: () => void;
}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
	const { className, value, placeholder = "", rows, style, maxLength, showCount, onChange, onFocus, onBlur } = props;
	const [val, setVal] = useState<string>(value || "");
	useEffect(() => {
		setVal(value || "");
	}, [value]);

	const handleFocus = (): void => {
		onFocus && onFocus();
	};

	const handleBlur = (): void => {
		onBlur && onBlur();
	};

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
		const value = event.target.value;
		setVal(value);
		onChange && onChange(value, event);
	};

	const handlePaste = (event: ClipboardEvent<HTMLTextAreaElement>): void => {
		event.preventDefault();
		const text = event.clipboardData?.getData("text/plain");
		if (text) {
			const v = val + text.replace(/[\r\n]+/g, "");
			const value = v.substring(0, maxLength);
			setVal(value);
			onChange && onChange(value, event);
		}
	};

	return (
		<div className={`ui-textarea ${className}`}>
			<textarea
				ref={ref}
				value={val}
				placeholder={placeholder}
				onPasteCapture={handlePaste}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
				rows={rows}
				style={style}
				maxLength={maxLength}
			/>
			{showCount ? (
				<div className="show-count">
					{val.length}
					{maxLength ? `/${maxLength}` : ""}
				</div>
			) : null}
		</div>
	);
});
