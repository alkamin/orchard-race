import React, { ReactNode } from "react";

type Props = {
  n: number;
  children: ReactNode;
};

const Repeat = ({ n, children }: Props) => {
  const child = React.Children.only(children);
  return (
    <>
      {React.isValidElement(child) &&
        [...Array(n)].map((_, i) =>
          React.cloneElement(child, { key: i }, child.props.children)
        )}
    </>
  );
};

export default Repeat;
