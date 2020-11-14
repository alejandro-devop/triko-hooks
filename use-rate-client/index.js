import {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {SAVE_RATING} from './queries';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'hooks/useNotification';

const useRateClient = (request = {}) => {
  const [loading, setLoading] = useState(false);
  const [saveRate] = useMutation(SAVE_RATING);
  const {error, success} = useNotify();
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-rate-client/index.js',
  });
  const sendRate = async (payload = {}) => {
    const {comment, stars = 0} = payload;
    setLoading(true);
    try {
      await saveRate({
        variables: {
          request: request.id,
          isClient: true,
          rating: stars,
          comment,
        },
      });
      success('qualification_send');
    } catch (e) {
      setLoading(false);
      reportError(e);
      error('Error while sending qualification');
    }
  };
  return {
    loading,
    sendRate,
  };
};

export default useRateClient;
