import classNames from "classnames";
import React, { useEffect } from "react";

export interface InputProps {
	className?: string;
	type?: "tel" | "text" | "email" | "number";
	value?: string;
	placeholder?: string;
	maxLength?: number;
	onChange?: (value: string) => void;
	onFocus?: (value?: string) => void;
	onBlur?: (value?: string) => void;
	disable?: boolean;
}

const prefixCls = "ui-input";

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { className = "", type = "text", value = "", disable = false, placeholder, maxLength, onChange, onFocus, onBlur } = props;
	const [val, setVal] = React.useState(value);

	useEffect(() => {
		setVal(value || "");
	}, []);

	useEffect(() => {
		if (value !== val) setVal(value || "");
	}, [value]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setVal(event.target.value);
		onChange && onChange(event.target.value);
	};

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
		onFocus && onFocus(event.target.value);
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
		onBlur && onBlur(event.target.value);
	};

	const classes = classNames(prefixCls, className, {
		[`${prefixCls}-disable`]: disable,
	});

	return (
		<div className={classes}>
			<input
				ref={ref}
				type={type}
				value={val}
				disabled={disable}
				maxLength={maxLength}
				placeholder={placeholder}
				onChange={handleChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
			/>
		</div>
	);
});
