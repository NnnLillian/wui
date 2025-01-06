import { InternalCheckbox } from "./checkbox";
import { CheckboxGroup } from "./group";

type CompoundedComponent = typeof InternalCheckbox & {
    Group: typeof CheckboxGroup;
};

const Checkbox = InternalCheckbox as CompoundedComponent;
Checkbox.Group = CheckboxGroup;

export default Checkbox;
