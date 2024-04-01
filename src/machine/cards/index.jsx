import { assign, createMachine } from "xstate";

const defaultValues = {
  name: "",
  year: "",
  month: "",
  cardNumber1: "",
  cardNumber2: "",
  cardNumber3: "",
  cardNumber4: "",
  cardCompany: "",
};

const cardsMachine = createMachine(
  {
    id: "cards",
    initial: "list",
    states: {
      list: {
        on: {
          ADD_CARD: {
            target: "form",
          },
          UPDATE_CARD: {
            target: "form",
            actions: ["updateInfo"],
          },
          REMOVE_CARD: {
            actions: ["removeCards"],
          },
        },
      },
      form: {
        on: {
          INSERT_CARD_INFO: {
            target: "submit",
            actions: ["insertInfo"],
          },
          BACK_TO_LIST: {
            target: "list",
            actions: ["resetCardInfo"],
          },
        },
      },
      submit: {
        on: {
          DONE: {
            target: "done",
            actions: ["insertCards"],
          },
        },
      },
      done: {
        type: "final",
        entry: [],
      },
    },
    context: {
      cards: {},
      cardInfo: defaultValues,
    },
  },
  {
    actions: {
      updateInfo: assign({
        cardInfo: ({ event }) => ({ ...event.data }),
      }),
      insertInfo: assign({
        cardInfo: ({ context: { cardInfo }, event }) => ({
          ...cardInfo,
          ...event.data,
        }),
      }),
      resetCardInfo: assign({
        cardInfo: {},
      }),
      removeCards: assign({
        cards: ({ context: { cards }, event }) => {
          const updateCards = { ...cards };
          delete updateCards[event.id];

          return updateCards;
        },
      }),
      insertCards: assign({
        cards: ({ context: { cards }, event }) => {
          console.log(event.data);
          console.log(event);

          return {
            [event.data.id]: event.data,
            ...cards,
          };
        },
      }),
    },
  }
);

export default cardsMachine;
