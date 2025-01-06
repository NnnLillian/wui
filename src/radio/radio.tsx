import classNames from "classnames";
import React, { FunctionComponent, useEffect, useState } from "react";

interface RadioOption<T extends InternalRadioValueType> {
	label: string | React.ReactNode;
	value: T;
	disable?: boolean;
}

export interface RadioProps<T extends InternalRadioValueType = InternalRadioValueType> {
	options: RadioOption<T>[];
	value?: T;
	onChange?: (value: T | undefined) => void;
	className?: string;
}

export type InternalRadioValueType = string | number;

const prefixCls = "ui-radio";

const Radio: FunctionComponent<RadioProps<InternalRadioValueType>> = <T extends InternalRadioValueType = InternalRadioValueType>(props: RadioProps<T>) => {
	const { options, value, onChange, className = "" } = props;
	const [select, setSelect] = useState<T>();

	useEffect(() => {
		value !== select && setSelect(value);
	}, [value]);

	const handleChange = (disable: boolean, event: any): void => {
		if (disable) return;
		setSelect(event.target.value);
		onChange && onChange(event.target.value);
	};
	const classes = classNames(prefixCls, className);

	return (
		<div className={classes}>
			{options.map((option: RadioOption<T>, index: number) => {
				const classItems = classNames(`${prefixCls}-item`, {
					[`${prefixCls}-item-selected`]: select == option.value,
					[`${prefixCls}-item-disable`]: option.disable,
				});
				return (
					<label key={index} className={classItems}>
						<input
							className="ui-radio-input"
							type="radio"
							value={option.value}
							checked={select == option.value}
							onChange={handleChange.bind(this, option.disable || false)}
						/>
						<span className="ui-radio-inner">{option.label}</span>
					</label>
				);
			})}
		</div>
	);
};

export default Radio;
