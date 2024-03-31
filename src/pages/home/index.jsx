import SubmitCard from "../../components/templates/submitCard";
import Funnel from "../../components/atoms/funnel";
import CardForm from "../../components/templates/cardForm";
import CardList from "../../components/templates/cardList";
import useCustomForm from "../../hooks/useForm";
import cardsMachine from "../../machine/cards";

const Home = () => {
  const form = useCustomForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      year: "",
      month: "",
      cardNumber1: "",
      cardNumber2: "",
      cardNumber3: "",
      cardNumber4: "",
      cardCompany: "",
    },
  });

  return (
    <Funnel machine={cardsMachine}>
      <Funnel.Step name="list">
        <CardList />
      </Funnel.Step>
      <Funnel.Step name="form">
        <CardForm />
      </Funnel.Step>
      <Funnel.Step name="submit">
        <SubmitCard />
      </Funnel.Step>
    </Funnel>
  );
};

export default Home;
