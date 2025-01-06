import React, { useEffect } from "react";
import { useState } from "react";
import { InternalCheckbox } from "./checkbox";

export interface CheckboxOptionType<T = any> {
	label: React.ReactNode;
	value: T;
	style?: React.CSSProperties;
	disabled?: boolean;
	required?: boolean;
}

export interface CheckboxGroupProps<T = any> {
	options: CheckboxOptionType<T>[];
	onChange?: (checkedValue: T[]) => void;
	value?: T[];
}

type InternalCheckboxValueType = string | number;

export const CheckboxGroup = React.forwardRef(
	<T extends InternalCheckboxValueType = InternalCheckboxValueType>(props: CheckboxGroupProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
		const { options, onChange, value } = props;
		const [selectedItems, setSelectedItems] = useState<Array<T>>([]);

		useEffect(() => {
			setSelectedItems(value || []);
		}, [value]);

		const memoOptions = React.useMemo<CheckboxOptionType<T>[]>(
			() =>
				options.map<CheckboxOptionType<T>>((option: any) => {
					if (typeof option === "string" || typeof option === "number") {
						return { label: option, value: option };
					}
					return option;
				}),
			[options]
		);

		const handleCheckboxChange = (event: any): void => {
			let selecteds = [];
			if (event.target.checked) {
				selecteds = [...selectedItems, event.target.value];
			} else {
				selecteds = selectedItems.filter((item) => item !== event.target.value);
			}
			setSelectedItems(selecteds);
			onChange && onChange(selecteds);
		};

		return (
			<div ref={ref} className="ui-checkbox-group">
				{memoOptions.map((option) => (
					<InternalCheckbox key={option.value.toString()} value={option.value} onChange={handleCheckboxChange} checked={selectedItems.includes(option.value)}>
						{option.label}
					</InternalCheckbox>
				))}
			</div>
		);
	}
);
