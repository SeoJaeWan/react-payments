import { useMachine } from "@xstate/react";
import { Children, cloneElement, useState } from "react";

const Step = ({ state, send, children }) => {
  return cloneElement(children, {
    ...children.props,
    send,
    state,
  });
};

const Funnel = (props) => {
  const { machine, children } = props;
  const [state, send] = useMachine(machine);

  return Children.map(children, (child) => {
    if (child.props.name === state.value) {
      return cloneElement(child, {
        ...child.props,
        send,
        state,
      });
    }
  });
};

Funnel.Step = Step;

export default Funnel;
