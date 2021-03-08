import {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_REQUEST} from './queries';
import useTranslation from 'shared/hooks/use-translate';
import {useSession} from 'hooks/index';
import useNotify from 'shared/hooks/use-notification';
import useErrorReporter from 'shared/hooks/use-error-reporter';

const useRequestUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [sendRequest] = useMutation(UPDATE_REQUEST);
  const {
    stack: {locale},
  } = useSession();
  const {_t} = useTranslation();
  const {success} = useNotify();
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-request-update/index.js',
  });
  const updateRequest = async (request, payload = {}) => {
    setLoading(true);
    try {
      await sendRequest({
        variables: {
          request: request.id,
          locale,
          ...payload,
        },
      });
      setLoading(false);
    } catch (e) {
      reportError(e);
      setLoading(false);
    }
  };

  const cancelRequest = async (request = {}) => {
    await updateRequest(request, {cancel: true});
    success('request_canceled_success');
  };

  const acceptRequest = async (request = {}) => {
    await updateRequest(request);
    success(_t('pending_services_request_accepted'));
  };

  return {
    loading,
    acceptRequest,
    cancelRequest,
    updateRequest,
  };
};

export default useRequestUpdate;
