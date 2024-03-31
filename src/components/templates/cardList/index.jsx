import Box from "../../atoms/box";
import Text from "../../atoms/text";
import Card from "../../molecules/card";
import { useMachine } from "@xstate/react";
import cardsMachine from "../../../machine/cards";

const CardList = () => {
  const [state, send] = useMachine(cardsMachine);

  return (
    <Box className={["app", "flex-column-center"]}>
      <Box className={"flex-center"}>
        <Text className={["page-title", "mb-10"]}>보유 카드</Text>
      </Box>

      {state.context.cards.map((data, idx) => (
        <Box className="card-item" key={idx}>
          <button onClick={() => send({ type: "UPDATE_CARD", data })}>
            <Card {...data} />
            <Text as="span" className={"card-nickname"}>
              {data.nickname}
            </Text>
          </button>
          <button
            className="card-delete-button"
            onClick={() => send({ type: "REMOVE_CARD", id: data.id })}
          >
            X
          </button>
        </Box>
      ))}

      <button onClick={() => send({ type: "ADD_CARD" })}>
        <Card empty />
      </button>
    </Box>
  );
};

export default CardList;
