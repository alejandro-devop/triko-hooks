import {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_REQUEST} from './queries';
import useTranslation from 'hooks/useTranslation';
import {useSession} from 'hooks/index';
import useNotify from 'hooks/useNotification';

const useRequestUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [sendRequest] = useMutation(UPDATE_REQUEST);
  const {
    stack: {locale},
  } = useSession();
  const {_t} = useTranslation();
  const {error, success} = useNotify();
  const updateRequest = async (request, payload = {}) => {
    setLoading(true);
    try {
      await sendRequest({
        variables: {
          request: request.id,
          locale,
        },
      });
      success(_t('pending_services_request_accepted'));
      setLoading(false);
    } catch (e) {
      error(_t('genric_error', {code: ''}));
      setLoading(false);
    }
  };
  return {
    loading,
    updateRequest,
  };
};

export default useRequestUpdate;
