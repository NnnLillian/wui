import React, { PropsWithChildren, useEffect, useState } from "react";

export interface CheckboxProps {
	checked?: boolean;
	value?: string | number;
	onChange?: (checked: boolean) => void;
}

export const InternalCheckbox: React.FunctionComponent<PropsWithChildren<CheckboxProps>> = ({
	children,
	checked,
	value,
	onChange,
}: PropsWithChildren<CheckboxProps>) => {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		if (checked !== undefined) setIsChecked(checked);
	}, [checked]);

	const handleCheckboxChange = (event: any): void => {
		setIsChecked(event.target.checked);
		if (onChange) onChange(event);
	};

	return (
		<label className="ui-checkbox">
			<input type="checkbox" checked={isChecked} value={value} onChange={handleCheckboxChange} />
			{children}
		</label>
	);
};
