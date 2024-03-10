import { Card } from '@/molecules/card/Card';
import { useForm } from '@/hooks/useForm/useForm';
import { usePaymentsFunnel } from '../payments.context';
import { STEP } from '../payments.constant';

// FIXME: 리팩터링 전, 코드 동작을 위한 임시 타입이기에 분리하지 않았습니다.
export interface CardFulfilledForm {
  number: boolean;
  expireDate: boolean;
  ownerName: boolean;
  securityCode: boolean;
  password: boolean;
}

export type CardFulfilledAction = React.Dispatch<
  React.SetStateAction<CardFulfilledForm>
>;

const ELLIPSIS_LENGTH = 11;
const DEFAULT_VALUE = {
  OWNER_NAME: 'NAME',
  EXPIRE_MONTH: 'MM',
  EXPIRE_YEAR: 'YY',
} as const;

export const AddCard = () => {
  const { setStep } = usePaymentsFunnel();
  const formMethods = useForm();
  const { values, errors } = formMethods;

  const handlePrev = () => setStep(STEP.CARD_LIST);
  const handleNext = () => {
    if (!isAllFieldsFulfilled) return;

    setStep(STEP.ADD_CARD_COMPLETE);
  };

  const isAllFieldsFulfilled = Object.values(errors).every((error) => !error);
  const optaionalClassName = isAllFieldsFulfilled ? 'text-fulfilled' : '';

  const {
    numberFirst,
    numberSecond,
    numberThird,
    numberFourth,
    expireMonth,
    expireYear,
    ownerName,
  } = values;

  const expireDate = `${expireMonth || DEFAULT_VALUE.EXPIRE_MONTH} / ${
    expireYear || DEFAULT_VALUE.EXPIRE_YEAR
  }`;

  return (
    <div>
      <h2 className='page-title' onClick={handlePrev}>{`< 카드 추가`}</h2>
      <div className='card-box'>
        <div className='empty-card'>
          <div className='card-top'></div>
          <div className='card-middle'>
            <div className='small-card__chip'></div>
          </div>
          <div className='card-bottom'>
            <div className='card-bottom__number'>
              <span className='card-text__big'>
                <span>
                  {numberFirst || ''}
                  {numberFirst?.length === 4 && <span>-</span>}
                </span>

                <span>
                  {numberSecond || ''}
                  {numberSecond?.length === 4 && <span>-</span>}
                </span>

                <span>
                  {(numberThird && Formatter.masking(numberThird)) || ''}
                  {numberThird?.length === 4 && <span>-</span>}
                </span>

                <span>
                  {(numberFourth && Formatter.masking(numberFourth)) || ''}
                </span>
              </span>
            </div>
            <div className='card-bottom__info'>
              <span className='card-text'>
                {Formatter.ellipsis(
                  ownerName || DEFAULT_VALUE.OWNER_NAME,
                  ELLIPSIS_LENGTH
                )}
              </span>
              <span className='card-text'>{expireDate}</span>
            </div>
          </div>
        </div>
      </div>

      <Card.Number formMethods={formMethods} />
      <Card.ExpireDate formMethods={formMethods} />
      <Card.OwnerName formMethods={formMethods} />
      <Card.SecurityCode formMethods={formMethods} />
      <Card.Password formMethods={formMethods} />

      {isAllFieldsFulfilled && (
        <div className='button-box' onClick={handleNext}>
          <span className={`button-text button-activate ${optaionalClassName}`}>
            다음
          </span>
        </div>
      )}
    </div>
  );
};

const Formatter = {
  ellipsis(text: string, n: number) {
    if (text.length > n) {
      return `${text.slice(0, n)}...`;
    }

    return text;
  },

  masking(text: string) {
    return text.replace(/./g, '*');
  },
};
