import { useMachine } from "@xstate/react";
import { Children, cloneElement, useState } from "react";

const Step = ({ children }) => {
  return cloneElement(children, {
    ...children.props,
  });
};

const Funnel = (props) => {
  const { machine, children } = props;
  const [state] = useMachine(machine);

  console.log(state.value);

  return Children.map(children, (child) => {
    if (child.props.name === state.value) {
      return cloneElement(child, {
        ...child.props,
      });
    }
  });
};

Funnel.Step = Step;

export default Funnel;
