import { assign, createMachine } from "xstate";

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
          },
        },
      },
      form: {
        on: {
          INSERT_CARD_INFO: {
            target: "submit",
          },
        },
      },
      submit: {
        on: {
          DONE: {
            target: "done",
          },
        },
      },
      done: {
        type: "final",
        entry: [],
      },
    },
    context: {
      cards: [],
      cardInfo: {},
    },
  },
  {
    actions: {
      updateInfo: assign({
        cardInfo: (_, event) => ({ ...event.select }),
      }),
      insertInfo: assign({
        cardInfo: ({ cardInfo }, event) => ({ ...cardInfo, ...event }),
      }),
      removeCards: assign({
        cards: ({ cards }, event) =>
          cards.filter(({ index }) => index !== event.index),
      }),
      insertCards: assign({
        cards: ({ cards, cardInfo }) => [cardInfo, ...cards],
      }),
    },
  }
);

export default cardsMachine;
