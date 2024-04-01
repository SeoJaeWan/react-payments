import PropTypes from "prop-types";
import Box from "../../atoms/box";
import Input from "../../atoms/input";
import Text from "../../atoms/text";
import Card from "../../molecules/card";
import random from "../../../utils/func/random";
import useForm from "../../../hooks/useForm";
import FormProvider from "../../../hooks/useFormProvider";

const SubmitCard = (props) => {
  const { state, send } = props;

  const form = useForm({
    mode: "onChange",
    defaultValues: state.context.cardInfo,
  });

  const handleAddCard = (data) => {
    if (!data.id) {
      const randomId = random(8);

      data.id = randomId;
      data.nickname = data.nickname || data.cardCompany;
    }

    console.log(data);

    send({ type: "DONE", event: { data } });
  };

  return (
    <FormProvider {...form}>
      <Box className={"app flex-column-center"}>
        <Box>
          <Text as="h2" className={["page-title", "mb-10"]}>
            카드등록이 완료되었습니다.
          </Text>
        </Box>

        <Box>
          <Card type="big" />
        </Box>

        <Box className={["input-container", "flex-center", "w-100"]}>
          <Input
            name="nickname"
            placeholder={"카드 별칭 (선택)"}
            className={["input-underline", "w-75"]}
            length={10}
          />
        </Box>

        <Box className={["button-box", "mt-50"]}>
          <button
            className={"button-text"}
            onClick={form.handleSubmit(handleAddCard)}
          >
            다음
          </button>
        </Box>
      </Box>
    </FormProvider>
  );
};

SubmitCard.propTypes = {
  setCardData: PropTypes.func,
  update: PropTypes.func,
};

export default SubmitCard;
