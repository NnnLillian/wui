import { ReactNode } from 'react';

type IProps = {
  children?: ReactNode;
  /**
   * this is a sample description
   */
  kind?: string | undefined;
};

const Button = ({ children, kind = "red" }: IProps) => {

  const onClick = () => {

  }

  // We use the kind prop to determine the button's class
  return <button className={kind} onClick={onClick}>{children}</button>;
};

export default Button;
