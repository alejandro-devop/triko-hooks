import {useState} from 'react';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'hooks/useNotification';
import {SAVE_REQUEST} from './queries';
import {useMutation} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';

const useSendRequest = () => {
  const {
    stack: {client = {}, locale},
  } = useSession();
  const [loading, setLoading] = useState(false);
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-send-request/index.js',
  });
  const [sendRequest] = useMutation(SAVE_REQUEST);
  const {error} = useNotify();
  const saveRequest = async (payload = {}) => {
    setLoading(true);
    const {
      address,
      attrs = {},
      byHour = 1,
      date,
      duration = 1,
      latitude,
      longitude,
      services = [],
      type = 1,
      triko = {},
    } = payload;
    try {
      const {data = {}} = await sendRequest({
        variables: {
          address,
          attrs: JSON.stringify(attrs),
          byHour,
          client: client.id,
          date,
          duration,
          lat: latitude,
          lng: longitude,
          services: JSON.stringify(
            services.map((item) => ({service_id: item.id})),
          ),
          locale,
          type,
          triko: triko.id,
        },
      });
      setLoading(false);
      return data.response;
    } catch (e) {
      reportError(e);
      error('Error while sending the request');
      setLoading(false);
    }
  };
  return {
    loading,
    saveRequest,
  };
};

export default useSendRequest;
