import { InternalForm, Item } from "./form";

type CompoundedComponent = typeof InternalForm & {
	Item: typeof Item;
};

const Form = InternalForm as CompoundedComponent;

Form.Item = Item;

export default Form;
