import {useState} from 'react';
import {STATUS_PAYMENT} from 'config/request-statuses';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_REQUEST} from 'components/service-execution/queries';
import useNotify from 'shared/hooks/use-notification';
import useTranslation from 'shared/hooks/use-translate';
import useSession from 'hooks/useSession';

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [updateRequest] = useMutation(UPDATE_REQUEST);
  const {error} = useNotify();
  const {_t} = useTranslation();
  const {
    setAll,
    stack: {locale, selectedToPay = {}},
  } = useSession();

  const initPayment = async (serviceRequest = {}, options = {}) => {
    const {isShopper, isTask, isCourier, isFavor, total} = options;
    setLoading(true);
    const {
      transition: {workflow},
    } = serviceRequest;
    try {
      if (workflow !== STATUS_PAYMENT) {
        const {data = {}} = await updateRequest({
          variables: {
            request: serviceRequest.id,
            locale,
          },
        });
        setLoading(false);
        setTimeout(() => {
          setAll({
            orderInProgress: {
              ...(selectedToPay.order || {}),
            },
            selectedToPay: {
              ...selectedToPay,
              ...data.response,
              isShopper,
              isTask,
              isCourier,
              total,
              isFavor,
            },
          });
        }, 1000);
      } else {
        await setAll({
          orderInProgress: {
            ...(selectedToPay.order || {}),
          },
          selectedToPay: {
            ...serviceRequest,
            isShopper,
            isTask,
            isCourier,
            isFavor,
            total,
          },
        });
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      error(_t('generic_error', {code: 'TK-00021'}));
    }
  };
  return {
    loading,
    initPayment,
  };
};

export default usePayment;
