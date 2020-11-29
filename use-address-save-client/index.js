import {useState} from 'react';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'hooks/useNotification';
import {useSession} from 'hooks/index';
import {SAVE_ADDRESS} from './queries';
import {useMutation} from '@apollo/react-hooks';

const useAddressSaveClient = (options = {}) => {
  const {withSuccess, successMessage = 'saved_successful', onSuccess} = options;
  const {
    stack: {client = {}, locale},
  } = useSession();
  const [loading, setLoading] = useState(false);
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-address-save/index.js',
  });
  const [sendRequest] = useMutation(SAVE_ADDRESS);
  const {error, success} = useNotify();
  const saveAddress = async (payload = {}) => {
    setLoading(true);
    try {
      const {address, buildingType, title, isMain = 1, lat, lng} = payload;
      const {response = {}} = await sendRequest({
        variables: {
          client: client.id,
          address,
          buildingType,
          isMain,
          title,
          lat,
          locale,
          lng,
        },
      });
      if (onSuccess) {
        onSuccess(response);
      }
      if (withSuccess) {
        success(successMessage);
      }
      setLoading(false);
      return response;
    } catch (e) {
      reportError(e);
      error('Error while saving the address');
      setLoading(false);
    }
  };

  return {
    loading,
    saveAddress,
  };
};

export default useAddressSaveClient;
