import React, { createContext, useState, useContext, PropsWithChildren, useImperativeHandle, useEffect } from "react";

export interface InternalFormType {
	/* 表单默认值，只有初始化时生效 */
	initialValues?: any;
	/* 提交表单且数据验证成功后回调事件 */
	onFinish: (values: any) => void;
	/* 提交表单且数据验证失败后回调事件 */
	onFinishFailed?: () => void;
	/* 字段值更新时触发回调事件 */
	onValuesChange?: (changedValues: any, allValues?: any) => void;
}
const FormContext = createContext<{
	values: { [name: string]: string };
	errors: { [key: string]: string };
	handleChange: (name: string) => (value: any) => void;
	setErrors: (errors: { [key: string]: any }) => void;
} | null>(null);

export interface ItemProps {
	name: string;
	label?: string;
	rules?: any[];
}

const valide = (rules: any[], value: any): { valid: boolean; message: string } => {
	let valid = true;
	let message = "";

	for (const rule of rules) {
		if (rule.required && !value) {
			message = rule.message || `this item is required`;
			valid = false;
			break;
		}

		if (rule.pattern && !rule.pattern.test(value)) {
			message = rule.message || `this item is not valid`;
			valid = false;
			break;
		}
	}

	return { valid, message };
};

export const Item: React.FC<PropsWithChildren<ItemProps>> = ({ name, label, rules = [], children }) => {
	const context = useContext(FormContext);

	if (!context) {
		throw new Error("Form.Item must be used within a Form");
	}

	const { values, handleChange, errors, setErrors } = context;
	const error = errors[name];
	const child = React.Children.only(children);

	const handleValueChange = (value: any): void => {
		const { message } = valide(rules, value);
		setErrors((prev: any) => ({ ...prev, [name]: message }));
		handleChange(name)(value);
	};

	// Add the value and onChange props to the child
	const modifiedChild = React.cloneElement(child as React.ReactElement, {
		value: values[name],
		onChange: handleValueChange,
	});

	return (
		<div className={`ui-form-item-row row-${name}`}>
			<div className="ui-form-item-label">{label}</div>
			<div className="ui-form-item-control">
				{modifiedChild}
				{error && <div className="ui-form-item-error">{error}</div>}
			</div>
		</div>
	);
};

export const InternalForm = React.forwardRef<HTMLFormElement, PropsWithChildren<InternalFormType>>((props, ref) => {
	const { initialValues = {}, onFinish, onValuesChange, onFinishFailed, children } = props;

	const [values, setValues] = useState<any>({});
	const [errors, setErrors] = useState({});

	useEffect(() => {
		setValues(initialValues);
	}, [JSON.stringify(initialValues)]);

	// 执行验证和调用 setError
	const validate = (): boolean => {
		let formValid = true;
		React.Children.forEach(children, (child) => {
			/**
			 * 1.调用 isValidElement(child) 来检测 child 是否是 React 元素。
			 * 2.调用 child.type === Item 来检测 child 的类型是否是 Item 组件。
			 * 3.调用 child.props.name 来获取 Item 组件是否存在 name 属性。
			 * 4.调用 child.props.rules 来获取 Item 组件是否存在 rules 属性。
			 * 如果以上条件都满足，则说明 child 是一个有效的 Item 组件，可以进行后续的验证操作。
			 */
			if (!React.isValidElement(child) || child.type !== Item || !child.props.name || !child.props.rules) return;

			const { name, rules } = child.props;
			const { message, valid } = valide(rules, values[name]);
			if (!valid && formValid) formValid = false; // 如果验证失败，则将 formValid 设置为 false
			setErrors((prev: any) => ({ ...prev, [name]: message }));
		});

		return formValid;
	};

	const handleChange =
		(name: string) =>
		(value: any): void =>
			setValues((prev: any) => {
				onValuesChange && onValuesChange({ [name]: value }, { ...prev, [name]: value });
				return { ...prev, [name]: value };
			});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event?.preventDefault();
		const valid = validate();
		if (valid) {
			onFinish(values);
		} else {
			onFinishFailed && onFinishFailed();
		}
	};

	useImperativeHandle(
		ref as any,
		() => ({
			...ref,
			submit: handleSubmit,
		}),
		[handleSubmit]
	);

	return (
		<FormContext.Provider value={{ values, handleChange, errors, setErrors }}>
			<form ref={ref} className="ui-form" onSubmit={handleSubmit}>
				{children}
			</form>
		</FormContext.Provider>
	);
});
