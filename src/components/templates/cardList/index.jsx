import PropTypes from "prop-types";
import Box from "../../atoms/box";
import Text from "../../atoms/text";
import Card from "../../molecules/card";
import { Fragment } from "react";
import { useMachine } from "@xstate/react";
import cardsMachine from "../../../machine/cards";

const CardList = () => {
  const [state, send] = useMachine(cardsMachine);

  return (
    <Box className={["app", "flex-column-center"]}>
      <Box className={"flex-center"}>
        <Text className={["page-title", "mb-10"]}>보유 카드</Text>
      </Box>

      {cardList.map((data, idx) => (
        <Box className="card-item" key={idx}>
          <button onClick={() => handleUpdateCard(data)}>
            <Card {...data} />
            <Text as="span" className={"card-nickname"}>
              {data.nickname}
            </Text>
          </button>
          <button
            className="card-delete-button"
            onClick={() => handleDeleteCard(data.id)}
          >
            X
          </button>
        </Box>
      ))}

      <button onClick={next}>
        <Card empty />
      </button>
    </Box>
  );
};

CardList.propTypes = {
  setCardData: PropTypes.func,
  cardData: PropTypes.object,
  next: PropTypes.func,
};

export default CardList;
